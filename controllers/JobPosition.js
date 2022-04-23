const axios = require('axios');
const JOB_URL = process.env.JOB_URL;

class JobPositionController {
    static async getJobPosition(req, res, next) {
        try {
            const job = await axios.get(`${JOB_URL}`)

            res.status(200).json({
                success: true,
                message: "Success retrive Job Position list",
                data: job.data,
            });
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async getJobPositionPage(req, res, next) {
        try {
            const job = await axios.get(`${JOB_URL}`)
            console.log("total job", job.data.length)

            const { page } = req.query;
            const limit = 5;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const result = job.data.slice(startIndex - endIndex)
            console.log("start", startIndex)
            console.log("end", endIndex)
            // console.log("result", result)

            res.status(200).json({
                success: true,
                message: "Success retrive Job Position list page",
                pages: Math.ceil(job.data.length / limit),
                current: page,
                data: result
            });
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async getDetailJobPosition(req, res, next) {
        try {
            const { id } = req.params;
            const job = await axios.get(`${JOB_URL}`)

            let detail = [];

            for(let i = 0; i < job.data.length; i++) {
                if(id === job.data[i].id){
                    detail.push(job.data[i])
                    break;
                }
            }
            
            res.status(200).json({
                success: true,
                message: "Success retrive Job Position by Id",
                data: detail[0],
            });
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async getJobPositionByDescription(req, res, next) {
        try {
            const { desc } = req.query;
            const job = await axios.get(`${JOB_URL}`)

            let detail = [];

            job.data.forEach(element => {
                if((new RegExp(desc, 'i')).test(element.description)){
                    detail.push(element)
                }
            });

            res.status(200).json({
                success: true,
                message: "Success retrive Job Position by Description",
                data: detail,
            });
        } catch (err) {
            next(err)
        }
    }

    static async getJobPositionByLocation(req, res, next) {
        try {
            const { loc } = req.query;
            const job = await axios.get(`${JOB_URL}`)

            let detail = [];

            job.data.forEach(element => {
                if((new RegExp(loc, 'i')).test(element.location)){
                    detail.push(element)
                }
            });

            res.status(200).json({
                success: true,
                message: "Success retrive Job Position by Location",
                data: detail,
            });
        } catch (err) {
            next(err)
        }
    }

    static async getJobPositionByTitle(req, res, next) {
        try {
            const { title } = req.query;
            const job = await axios.get(`${JOB_URL}`)

            let detail = [];

            job.data.forEach(element => {
                if((new RegExp(title, 'i')).test(element.title)){
                    detail.push(element)
                }
            });

            res.status(200).json({
                success: true,
                message: "Success retrive Job Position by Title",
                data: detail,
            });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = JobPositionController;
