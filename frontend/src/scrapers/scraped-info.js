'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs',

     [
    {artist: "System of a Down",
     title: "Toxicity",
     producer: "Daron Malakian|Rick Rubin|",
     body:
     `[Produced by Rick Rubin, Daron Malakian, Serj Tankian]

      [Verse 1]
      Conversion, software version 7.0
      Looking at life through the eyes of a tire hub
      Eating seeds as a pastime activity
      The toxicity of our city, of our city

      [Chorus]
      You, what do you own the world? How do you own disorder, disorder?
      Now, somewhere between the sacred silence, sacred silence and sleep
      Somewhere between the sacred silence and sleep
      Disorder, disorder, disorder

      [Verse 2]
      More wood for their fires, loud neighbors
      Flashlight reveries caught in the headlights of a truck
      Eating seeds as a pastime activity
      The toxicity of our city, of our city

      [Chorus]
      You, what do you own the world? How do you own disorder, disorder?
      Now, somewhere between the sacred silence, sacred silence and sleep
      Somewhere between the sacred silence and sleep
      Disorder, disorder, disorder

      [Instrumental Bridge]

      [Chorus]
      You, what do you own the world? How do you own disorder?
      Now, somewhere between the sacred silence, sacred silence and sleep
      Somewhere between the sacred silence and sleep
      Disorder, disorder, disorder

      [Outro]
      When I became the sun, I shone life into the man's hearts
      When I became the sun, I shone life into the man's hearts
      `, media: `<iframe id="player-iywaBOMvYLI" src="https://www.youtube.com/embed/iywaBOMvYLI?controls=2&amp;enablejsapi=1&amp;fs=1&amp;iv_load_policy=3&amp;modestbranding=1&amp;rel=0&amp;playsInline=0&amp;origin=https%3A%2F%2Fgenius.com&amp;start=0" title="Music Video"></iframe>`, visits: 79, coverArt: "https://images.genius.com/50368d30585280b5ddb752693de840a9.1000x1000x1.jpg", createdAt: newDate(), updatedAt: newDate()},


      ,{artist: "System of a Down",
       title: "Chop Suey!", producer: "Serj Tankian|Rick Rubin|", body: `[Intro: Serj Tankian]
      We're rolling "Suicide"

      [Verse: Serj Tankian]
      Wake up (Wake up)
      Grab a brush and put a little makeup
      Hide your scars to fade away the shakeup (Hide the scars to fade away the shakeup)
      Why'd you leave the keys upon the table?
      Here you go, create another fable, you wanted to
      Grab a brush and put a little makeup, you wanted to
      Hide the scars to fade away the shakeup, you wanted to
      Why'd you leave the keys upon the table? You wanted to

      [Chorus: Serj Tankian with Daron Malakian]
      I don't think you trust
      In my self-righteous suicide
      I cry when angels deserve to die

      [Verse: Serj Tankian]
      Ah! Wake up (Wake up)
      Grab a brush and put a little makeup (A little bit)
      Hide the scars to fade away the (Hide the scars to fade away the shakeup)
      Why'd you leave the keys upon the table?
      Here you go, create another fable, you wanted to
      Grab a brush and put a little makeup, you wanted to
      Hide the scars to fade away the shakeup, you wanted to
      Why'd you leave the keys upon the table? You wanted to

      [Chorus: Serj Tankian with Daron Malakian]
      I don't think you trust
      In my self-righteous suicide
      I cry when angels deserve to die
      In my self-righteous suicide
      I cry when angels deserve to die

      [Bridge: Serj Tankian & Daron Malakian]
      Father, father, father, father
      Father, father, father, father
      Father, into your hands I commend my spirit
      Father, into your hands
      Why have you forsaken me?
      In your eyes, forsaken me?
      In your thoughts, forsaken me?
      In your heart, forsaken me? Oh

      [Outro: Serj Tankian & Daron Malakian]
      Trust in my self-righteous suicide
      I cry when angels deserve to die
      In my self-righteous suicide
      I cry when angels deserve to die
      `, media: `<iframe id="player-CSvFpBOe8eY" src="https://www.youtube.com/embed/CSvFpBOe8eY?controls=2&amp;enablejsapi=1&amp;fs=1&amp;iv_load_policy=3&amp;modestbranding=1&amp;rel=0&amp;playsInline=0&amp;origin=https%3A%2F%2Fgenius.com&amp;start=0" title="Music Video"></iframe>`, visits: 162, coverArt: "https://images.genius.com/6902311b340708c9d085e8f009a670cd.1000x525x1.jpg", createdAt: newDate(), updatedAt: newDate()},
      ]},, {});
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
