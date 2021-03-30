const express = require('express');
const router = express.Router();

router.get('/campgrounds', async(req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
});

router.get('/campgrounds/new', (req, res) => { // ruta spre pagina unde se creeaza un obiect nou
    res.render('campgrounds/new');
});

router.post('/campgrounds', validateCampground, catchAsync(async(req, res) => { // se creeaza obiectul si se introduce in baza de date
    if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);

    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.get('/campgrounds/:id', catchAsync(async(req, res) => { // arata un obiect deja existent pe baza id-ului
    const campground = await Campground.findById(req.params.id).populate('reviews');
    res.render('campgrounds/show', { campground });
}));

router.get('/campgrounds/:id/edit', catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}));

router.put('/campgrounds/:id', validateCampground, catchAsync(async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/campgrounds/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));

module.exports = router;