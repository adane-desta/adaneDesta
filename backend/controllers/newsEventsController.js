

import NewsEventsModel from '../models/newsEventsModel.js';

const NewsEventsController = {
    insertNewsEvent: async (req, res) => {
        try {
            const { newsEvent, localization } = req.body;
            const newsEventId = await NewsEventsModel.insertNewsEvent(newsEvent, localization);
            res.status(201).json({ news_event_id: newsEventId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    insertResources: async (req, res) => {
        try {
            const { newsEvent, localization } = req.body;
            const newsEventId = await NewsEventsModel.insertResources(newsEvent, localization);
            res.status(201).json({ news_event_id: newsEventId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getNewsEvents: async (req, res) => {
        try {
            
            const { language_code } = req.query;
            const newsEvents = await NewsEventsModel.getNewsEvents(language_code);
            res.status(200).json(newsEvents);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getResources: async (req, res) => {
        try {
            
            const { language_code } = req.query;
            const newsEvents = await NewsEventsModel.getResources(language_code);
            res.status(200).json(newsEvents);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteNewsEvent: async (req, res) => { 
        try { 
            const { id } = req.params; 
            await NewsEventsModel.deleteNewsEvent(id); 
            res.status(204).json(); 
        } catch (error) { 
            res.status(500).json({ error: error.message }); 
        }
     },

     deleteResources: async (req, res) => { 
        try { 
            const { id } = req.params; 
            await NewsEventsModel.deleteResources(id); 
            res.status(204).json(); 
        } catch (error) { 
            res.status(500).json({ error: error.message }); 
        }
     }

     

    
};

export default NewsEventsController;
