import express from 'express';
import { db } from '../lib/db.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// GET /api/students - Get all students for logged-in counselor with pagination and filtering
router.get('/', protectRoute, async (req, res) => {
    try {
        const { gender, college, search, page = 1, limit = 10 } = req.query;
        const counselorId = req.counselorId;
        const offset = (page - 1) * limit;

        // Build the base query using direct counselorID relationship
        let query = `
            SELECT studentID, name, studentNo, gender, email, college, program, 
                   '/user-stud.png' as profileImage
            FROM student 
            WHERE counselorID = ?
        `;
        const params = [counselorId];

        // Add filters
        if (gender) {
            query += ' AND gender = ?';
            params.push(gender);
        }
        if (college) {
            query += ' AND college = ?';
            params.push(college);
        }
        if (search) {
            query += ' AND name LIKE ?';
            params.push(`%${search}%`);
        }

        // Add pagination
        query += ' ORDER BY name ASC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        // Get total count for pagination
        let countQuery = `SELECT COUNT(*) as total FROM student WHERE counselorID = ?`;
        const countParams = [counselorId];

        if (gender) {
            countQuery += ' AND gender = ?';
            countParams.push(gender);
        }
        if (college) {
            countQuery += ' AND college = ?';
            countParams.push(college);
        }
        if (search) {
            countQuery += ' AND name LIKE ?';
            countParams.push(`%${search}%`);
        }

        const [students, countResult] = await Promise.all([
            db.query(query, params),
            db.query(countQuery, countParams)
        ]);

        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        res.json({
            students: students[0],
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalStudents: total,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET /api/students/colleges - Get all unique colleges for filter dropdown
router.get('/colleges', protectRoute, async (req, res) => {
    try {
        const counselorId = req.counselorId;
        
        const query = `
            SELECT DISTINCT college 
            FROM student 
            WHERE counselorID = ?
            ORDER BY college ASC
        `;
        const result = await db.query(query, [counselorId]);
        const colleges = result[0].map(row => row.college);
        res.json(colleges);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET /api/students/:id - Get single student by ID
router.get('/:id', protectRoute, async (req, res) => {
    try {
        const { id } = req.params;
        const counselorId = req.counselorId;
        
        const query = `
            SELECT studentID, name, studentNo, gender, email, college, program,
                   '/user-stud.png' as profileImage
            FROM student 
            WHERE studentID = ? AND counselorID = ?
        `;
        
        const result = await db.query(query, [id, counselorId]);
        
        if (result[0].length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        res.json(result[0][0]);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET /api/students/:id/sessions - Get all sessions for a student
router.get('/:id/sessions', protectRoute, async (req, res) => {
    try {
        const { id } = req.params;
        const counselorId = req.counselorId;
        
        const query = `
            SELECT s.sessionID, s.sessionDate, s.sessionTime, s.sessionNotes, s.status,
                   a.campus, a.date as appointmentDate, a.time as appointmentTime
            FROM session s
            JOIN appointment a ON s.appointmentID = a.appointmentID
            JOIN student st ON a.studentID = st.studentID
            WHERE st.studentID = ? AND st.counselorID = ?
            ORDER BY s.sessionDate DESC, s.sessionTime DESC
        `;
        
        const result = await db.query(query, [id, counselorId]);
        res.json(result[0]);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET /api/sessions/history - Get all sessions for counselor with month filtering
router.get('/sessions/history', protectRoute, async (req, res) => {
    try {
        const { month, year } = req.query;
        const counselorId = req.counselorId;
        
        let query = `
            SELECT s.sessionID, s.sessionDate, s.sessionTime, s.sessionNotes, s.status,
                   st.studentID, st.name as studentName,
                   a.campus, a.date as appointmentDate, a.time as appointmentTime
            FROM session s
            JOIN appointment a ON s.appointmentID = a.appointmentID
            JOIN student st ON a.studentID = st.studentID
            WHERE a.counselorID = ?
        `;
        
        const params = [counselorId];
        
        // Add month/year filtering if provided
        if (month && year) {
            query += ' AND MONTH(s.sessionDate) = ? AND YEAR(s.sessionDate) = ?';
            params.push(parseInt(month), parseInt(year));
        }
        
        query += ' ORDER BY s.sessionDate DESC, s.sessionTime DESC';
        
        const result = await db.query(query, params);
        
        // Format the response
        const sessions = result[0].map(session => ({
            sessionID: session.sessionID,
            studentID: session.studentID,
            studentName: session.studentName,
            profileImage: '/user-stud.png', // Default since profileImage doesn't exist in schema
            date: new Date(session.sessionDate).toLocaleDateString('en-US', { 
                day: '2-digit', 
                month: 'long' 
            }),
            status: session.status,
            feedback: session.sessionNotes || null,
            campus: session.campus,
            sessionTime: session.sessionTime
        }));
        
        res.json(sessions);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET /api/dashboard/stats - Get dashboard statistics for counselor
router.get('/dashboard/stats', protectRoute, async (req, res) => {
    try {
        const counselorId = req.counselorId;
        
        // Get counselor info
        const [counselorResult] = await db.query(
            'SELECT name, profession, counselorImage FROM counselor WHERE counselorID = ?', 
            [counselorId]
        );
        
        if (counselorResult.length === 0) {
            return res.status(404).json({ error: 'Counselor not found' });
        }
        
        // Get total students count for current month
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        
        const [studentsCountResult] = await db.query(
            'SELECT COUNT(*) as totalStudents FROM student WHERE counselorID = ?', 
            [counselorId]
        );
        
        // Get upcoming sessions for current month
        const [sessionsResult] = await db.query(`
            SELECT s.sessionID, s.sessionDate, s.sessionTime, s.status,
                   st.studentID, st.name as studentName,
                   a.campus
            FROM session s
            JOIN appointment a ON s.appointmentID = a.appointmentID
            JOIN student st ON a.studentID = st.studentID
            WHERE a.counselorID = ? 
            AND MONTH(s.sessionDate) = ? 
            AND YEAR(s.sessionDate) = ?
            AND s.sessionDate >= CURDATE()
            ORDER BY s.sessionDate ASC, s.sessionTime ASC
            LIMIT 10
        `, [counselorId, currentMonth, currentYear]);
        
        // Format sessions data
        const upcomingSessions = sessionsResult.map(session => ({
            sessionID: session.sessionID,
            studentID: session.studentID,
            studentName: session.studentName,
            profileImage: '/user-stud.png', // Default since profileImage doesn't exist in schema
            date: session.sessionDate,
            time: session.sessionTime,
            status: session.status,
            campus: session.campus
        }));
        
        res.json({
            counselor: {
                name: counselorResult[0].name,
                profession: counselorResult[0].profession,
                image: counselorResult[0].counselorImage || '/counsel-prof.png'
            },
            stats: {
                totalStudents: studentsCountResult[0].totalStudents
            },
            upcomingSessions: upcomingSessions
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

export default router;
