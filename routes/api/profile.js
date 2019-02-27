const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

const validateProfileInput = require("../../validation/profile");
const validateSubjectInput = require("../../validation/subject");

router.get("/test", (req, res) => res.json({ msg: "Profile route works" }));

//Get current user's profile(Private)
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ _user: req.user.id })
      .populate("_user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//get all profile (public)
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("_user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiels" }));
});

//get profile by handle (public)
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("_user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//get profile by user id (public)
router.get("/user/:user", (req, res) => {
  const errors = {};
  Profile.findOne({ _user: req.params.user })
    .populate("_user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//create or update profile ( private)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields._user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    req.body.major
      ? (profileFields.major = req.body.major)
      : (profileFields.major = "");
    if (req.body.fieldofstudy)
      profileFields.fieldofstudy = req.body.fieldofstudy;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (typeof req.body.skills != "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    profileFields.social = {};
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({ _user: req.user.id }).then(profile => {
      if (profile) {
        // if (profile.handle !== req.body.handle) {
        //   Profile.findOne({ handle: profileFields.handle }).then(profile => {
        //     if (profile) {
        //       errors.handle = "That handle already exists";
        //       res.status(400).json(errors);
        //     }
        //   });
        // }
        Profile.findOneAndUpdate(
          { _user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That Username already exists";
            res.status(400).json(errors);
          }

          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//add subject (private)

router.post(
  "/subject",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSubjectInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ _user: req.user.id }).then(profile => {
      const newSubject = {
        subjectname: req.body.subjectname,
        coordinator: req.body.coordinator,
        tutor: req.body.tutor,
        description: req.body.description
      };

      profile.subject.unshift(newSubject);
      profile.save().then(profile => res.json(profile));
    });
  }
);

//delete subject from profile private

router.delete(
  "/subject/:sub_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ _user: req.user.id })
      .then(profile => {
        const removeIndex = profile.subject
          .map(item => item.id)
          .indexOf(req.params.sub_id);

        profile.subject.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//delete user and profile

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ _user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
