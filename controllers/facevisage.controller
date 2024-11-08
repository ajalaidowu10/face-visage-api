const  Clarifai = require('clarifai');
const validator = require('../requests/facevisage.request');

const clarifaiApp = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY
});

const handle = (req, res) => {
	const { imgUrl } = req.body;
	// imgUrl: https://previews.123rf.com/images/piksel/piksel1505/piksel150500110/40365666-happy-family-at-home.jpg
	let validate = validator(req.body);
	if(!validate.formIsValid){
		return res.status(400)
				  .send({message:'Incorrect Details', status:400, data:{errors: validate.errors}});
	}
	clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, imgUrl)
			    .then(data => {
				    res.json({message:'Face Detection Successfull', status:200, data:data });
				})
	  			.catch(err => {
	    			console.log(err);
	 			});
	
}

module.exports = { handle }