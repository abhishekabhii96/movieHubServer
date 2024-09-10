const reviews = require('../model/reviewModel')

exports.addReviewController = async (req, res) => {
  console.log('inside addReviewController ');
  const userId = req.payload
  console.log(userId);
  const { movie, language, director, cast, username, review } = req.body
  const movimg = req.file.filename
  try {
    const existingReview = await reviews.findOne({ movie })
    if (existingReview) {
      res.status(406).json('review already exist')
    }
    else {
      const newReview = new reviews({
        movie, language, director, cast, username, review, movimg, userId
      })
      await newReview.save()
      res.status(200).json(newReview)
    }


  } catch (error) {
    res.status(406).json(error)
  }
}

exports.getAllReviewController = async (req, res) => {
  const searchKey = req.query.search
  console.log(searchKey);

  try {
    const query = {
      movie: { $regex: searchKey, $options: 'i' }
    }

    const allReviews = await reviews.find(query).limit(4)
    if (allReviews) {
      res.status(200).json(allReviews)
    }
    else {
      res.status(406).json('No reviews')
    }
  } catch (error) {
    res.status(401).json(error)
  }
}

exports.homeReviewController = async (req, res) => {
  try {
    const homeReviews = await reviews.find().limit(3)
    res.status(200).json(homeReviews)

  } catch (error) {
    res.status(401).json(error)
  }
}

exports.userReviewController = async (req, res) => {
  const userId = req.payload

  try {
    const userReview = await reviews.find({ userId })
    if (userReview) {
      res.status(200).json(userReview)
    }
    else {
      res.status(406).json('No Reviews Added Yet')
    }
  } catch (error) {
    req.status(401).json(error)
  }
}

exports.deleteReviewController = async (req, res) => {
  console.log('inside delete function');
  const { id } = req.params
  console.log(id);
  try {
    const review = await reviews.findByIdAndDelete({ _id: id })
    res.status(200).json(review)
  } catch (error) {
    res.status(401).json(error)
  }
}

exports.editReviewController = async (req, res) => {
  const {id} = req.params
  const userId = req.payload
  const { movie, language, director, cast, username, review, movimg } = req.body

  const uploadedImage = req.file? req.file.filename: movimg

  try {
    const existingReview = await reviews.findByIdAndUpdate({_id:id},{
      movie, language, director, cast, username, review, movimg: uploadedImage,
      userId
    })
    await existingReview.save()
    res.status(200).json(existingReview)

  } catch (error) {
    res.status(401).json(error)
  }

}