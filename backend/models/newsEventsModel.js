



import db from '../config/db.js'

const NewsEventsModel = {
    insertNewsEvent: async (newsEvent, localization) => {
        const connection = await db.getConnection();
        await connection.beginTransaction();
        
        try {
            const [result] = await connection.query(
                `INSERT INTO NewsEvents (title, description, type, date, image_url) VALUES (?, ?, ?, ?, ?)`,
                [newsEvent.title, newsEvent.description, newsEvent.type, newsEvent.date, newsEvent.image_url]
            );
            const newsEventId = result.insertId;

            for (const loc of localization) {
                await connection.query(
                    `INSERT INTO NewsEventsLocalized (id, language_code, title, description) VALUES (?, ?, ?, ?)`,
                    [newsEventId, loc.language_code, loc.title, loc.description]
                );
            }

            await connection.commit();
            return newsEventId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    insertResources: async (newsEvent, localization) => {
        const connection = await db.getConnection();
        await connection.beginTransaction();
        
        try {
            const [result] = await connection.query(
                `INSERT INTO resources (title, description, type, created_at , image_url , actual_resource_url)  VALUES (?, ?, ?, ?, ?, ?)`,
                [newsEvent.title, newsEvent.description, newsEvent.type, newsEvent.date, newsEvent.image_url , newsEvent.actual_resource_url]
            );
            const newsEventId = result.insertId;

            for (const loc of localization) {
                await connection.query(
                    `INSERT INTO resourceslocalized (id, language_code, title, description)  VALUES (?, ?, ?, ?)`,
                    [newsEventId, loc.language_code, loc.title, loc.description]
                );
            }

            await connection.commit();
            return newsEventId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    getNewsEvents: async (language_code) => {
        const [newsEvents] = await db.query(
            `SELECT ne.id, nel.title, nel.description, ne.type, ne.date, ne.image_url
             FROM NewsEvents ne
             JOIN NewsEventsLocalized nel ON ne.id = nel.id
             WHERE nel.language_code = ?`,
            [language_code]
           
        );
        return newsEvents;
    },

    getResources: async (language_code) => {
        const [newsEvents] = await db.query(
            `SELECT res.id, reslo.title, reslo.description, res.type, res.created_at, res.image_url , res.actual_resource_url
            FROM resources res
            JOIN resourceslocalized reslo ON res.id = reslo.id
            WHERE reslo.language_code = ?`,
            [language_code]
           
        );
        return newsEvents;
    },


    deleteNewsEvent: async (id) => { 
        const connection = await db.getConnection(); 
        await connection.beginTransaction(); 
        try { 
            await connection.query('DELETE FROM NewsEventsLocalized WHERE id = ?', [id]); 
            await connection.query('DELETE FROM NewsEvents WHERE id = ?', [id]); 
            await connection.commit(); 
        } catch (error) { await connection.rollback(); 
            throw error; } finally { connection.release(); 
        }
     } ,

     deleteResources: async (id) => { 
        const connection = await db.getConnection(); 
        await connection.beginTransaction(); 
        try { 
            await connection.query('DELETE FROM resourceslocalized WHERE id = ?', [id]); 
            await connection.query('DELETE FROM resources WHERE id = ?', [id]); 
            await connection.commit(); 
        } catch (error) { await connection.rollback(); 
            throw error; } finally { connection.release(); 
        }
     }
};

export default NewsEventsModel;
