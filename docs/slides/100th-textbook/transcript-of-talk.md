# 100 Intelligent Textbook Celebration



First of all, I just want to thank Justin.

I want to tell a quick story about Justin to set the stage.
In 2014, I believe, Justin was running this thing called the Minnesota Arduino user group.
Anybody remember that at all?

Yeah.

A few members, right?

And Justin and I were talking one day and I said, "Yeah, I really like Arduino.
I want to want to teach kids how to write code on Arduino." and he said, "Dan, you're in the wrong group.  You should be at this CoderDojo group." And so he sent me over there and that's really how I got started building educational content was through that experience with kids.

So give a big hand to Justin.

We just need more leadership like Justin in the Twin Cities.

I don't want to be the bringer of doom and gloom because we are doing great things but we have to keep an eye on the ball.  In China things are moving much much faster.
We'll talk a little bit about what's happening there.  When you go to graduation commencements here and the commencement speaker says that AI is the future and the crowd "Boos".

That's not a good sign when we see videos of a classroom of 30 high school kids in China and each one of them has a robot arm that they're controlling the seven degree of freedom $1,200 robot arm.
They're using OpenClaw to talk to it and they're teaching it how to do things reproducibly and at the end of the class they send them out to all the companies to automate all their processes with these things.

Right? High school students!

So, we are not leaders in using AI here.  We are followers and I'm challenging everybody here to step up like Justin to be leaders.

So, all right. So what I'm going to do is just going to go through my journey here, uh, and, uh, give you a little background.

In 1995, this science fiction writer named Neil Stevenson wrote this book called Diamond Age.

Has anybody heard about this book before?

Okay, two people, three people, right?
The genre is cyberpunk.
The rules of the genre is nothing that's impossible according to the laws of physics.
Uh, no warp drive, no time travel.
But nanotechnology is good, networks are good.

All these other things.
And what Neil envisioned was an age where a little girl could find this AI powered tablet.
And the tablet is programmed to imprint on the little girl.
And every single lesson that the girl needs is customized to her environment.
Right.
She has a little dinosaur pet.

So the dinosaur becomes a character to teach her lessons.
It uses the context of her environment to build customized lesson plans.
So that's setting the stage.
So this is me AI rendered in 1995.
I gave it an old photo from the 1995.
And so my quest has been "How do I build such a thing?"

31 years ago.
So I've had some time to think about it, and I had kids at the time and I wanted them to grow up in a world where they could engage in a joyful way, right?

In the best of all.

Now AI is just like a tool.

any other technology tool just like a knife can be used for good or can be used for evil, right?

Why don't we focus on bringing out the best that we can in China?

And to me, this is democratization of education so that every child on planet earth has the same opportunities as the best MIT graduate.

Right?

We should be able to do that today.

now one of the things that I I have observed is that textbooks are especially today are problematic at the University of Minnesota we have textbooks that have been used and we have some professors here to to justify their this they've used the same textbook for 15 years right they know every page in every lab and every exercise they're very familiar with it it's kind of hard to get them to jump on this new bandwag you're not where you teach a class to the lowest third of the class.

Uh, some of the kids that don't get it are lost, but you often lose and the best students are born, right?

So, we lose most of our students.

Uh, that's called direct instruction.

you stand up sage on the stage and that's how you learn.

Um, uh, it's expensive, $1,300 a year, the average cost of textbooks for a college student.

Uh, and it's passive reading, right?

In the age where our students are using Tik Tok and imagine they're sitting in their bedroom and they have videos.

What are they going to do, right?

they're going to go to their Tik Tok place.

so we have this crisis of engagement.

Our kids are not engaging in the textbooks.

and there's no time to personalize, right?

you do one sizefits-all.

Imagine a world where you could type in generate a thousandpage textbook on information systems with 100 micro simulations in it and it would do it.

Okay, we're not that far away.

Uh, and I'll show you how close we This is actually a book that I generated.

Uh, it was about 10 hours for me to create it.

And, uh, most of the time was tweaking it, user interface stuff.

So, uh, and you'll see some of those things.

Um, all right.

So, uh, I gave, um, Claude a bullet list of how I got there, and I asked it to create the textual description, an image prompt, uh, of my journey.

Right now, Claude doesn't have a text to image generator, but I could have it generate a very detailed description.

And I just gave this to OpenAI's image in two and it it created this journey map which is a lot by the way too much information.

It's a I squint but you can kind of see that when I started graduate school at the University of Minnesota I had to learn lisp.

It wasn't really the the the great AI experience.

I worked at Bell Labs on hardware.

I worked for Steve Jobs at Next.

I realized very soon that in order to build this thing, I needed a knowledge representation that would work.

I realized that relational databases, tab, tables and spreadsheets were not an ideal way to store the knowledge to back this up.

I started a conference called the NoSQL now conference.

I focused on graph databases.

I built the world's largest healthcare knowledge graph with a team of about 150 people at United Health Group.

and then we started to after I left there I started to really focus on and I designed a structure called a learning graph.

You'll be seeing some of that.

That's the core of all the textbooks.

The difference between a dumb textbook and a smart textbook is the knowledge representation that's accessible to the the agents that are trying to build the textbook.

Right?

So it's about storing information that you can be queried quickly and then understand how those things are linked.

and then eventually it's actually crazy.

It's almost one year ago today that Anthropic announced Cloud Code.

It was May of last year and then it was only last October that they released Claude Code skills.

Only last October.

And each of those gave me a tenfold increase in productivity.

Right?

So it has changed very quickly.

Justin can tell you that when we when we were volunteering, the kids would rip the wires off all the motors.

and so we'd have all these motors, but the wires weren't hooked up.

So, somebody had to go in and solder them on and then create a textbook on how to use those things.

And so, I started to do all that.

Um, I worked with the fabulous Valerie Lockheart.

She can't be here tonight.

Uh, anybody else work with Valerie here?

Yeah, a couple people, right?

Uh, she brilliant.

She was doing yoga one day and she realized that there was one library that was perfect for pairing with AI and that was called the processing library or pine.

And what she did is she showed that by giving Claude or it was chat GBT at the time just giving them enough hints use this processing library pulled these sliders that you could build interactively simulations on the fly.

and so that was called micro sims.

It's kind of the heart of everything we do.

And then we extended that.

and Micros offers a unique thing the combination of simplicity right one concept per simulation ideally AI generation.

So we have lots P p P P P P P P P P P P P P P P P P P P P5 is a very common library.

There are hundreds and hundreds of thousands of sample p5 code out there.

Not all of it good, but that's another story.

and sometimes AI picks up the coding errors that young that new students make and then accessibility.

So I had to figure out how to embed these sim micro sims in any page and the secret is using an I frame and then standards around those iframes.

So that was another chapter that really started to get me to think about.

and then I started to build textbooks and I wanted to do this hyperpersonalization and I started to realize that the process of putting information about an individual student inside the web browser was dangerous, right?

and so I came up with this model.

if you know autonomous vehicles are also a highly regulated system.

There's five levels of atomic autonom autonomous vehicles from you know cruise control is level one all the way to punch in a destination and it drives there in any condition that's level five.

so we created a fivelevel model from static textbooks to interactive content but then adaptive means you're adapting the content on the fly to the needs of the student.

What do they know today?

What are they prepared to know?

What are the prerequisites that they know?

What are their learning objectives?

And how do you get them to their learning objectives without distracting them with things they don't care about?

And that's a graph traversal.

then in western cultures we have $20 a month that we can buy chat things.

So then we want to cost effectively do that.

and Dan Yarmok and I have published papers on token efficiency.

so if you are interested in token efficiency, we have a whole textbook on it.

Dan is your guy.

He's amazing at figuring out how to cut the costs of building chatbot down and he's extended my framework in ways I absolutely had no idea it could be done.

So it's great to work with brilliant people like Dan.

and then eventually autonomous AI, right?

Autonomous AI is really where every time the student comes to their book, it will generate new concepts on the fly.

Custom lesson plans with their interests, their interest in baseball.

We're going to create a projectile motion that has baseball and batters and it will be interesting to them because it's personalized to their interests and their needs.

Right?

We're a long way away from autonomous AI.

Uh, I keep saying that I keep thinking that I would never do this while I was alive and then look what happened.

Uh, so we may be.

But what I'm going to show you today is intentionally pegged at what I call the 2.99 level.

Highly interactive.

everything I possibly can do to make it interactive, but nothing that will endanger my teachers getting sued because they leak student data.

Right?

So, I have lots of frameworks to do this.

By the way, everything I'm doing, I should just mention, is all open source.

It's all free and licensed under Creative Commons.

You can build your own textbooks on your own and resell them.

but all the textbooks I generate are available for every teacher in the world and the only thing is they can't resell it for money right so that's things but there are moving up to this level most important thing you know we are in the content generation revolution right all these tools generate content so what does that do to the cost of creating content.

It drives it to zero.

Right?

If you are in a business today that is generating content, you should really think about that.

Right?

If you want to start up a new company that your sole value is I'm going to generate this book, you should think about that.

Right?

On the other hand, if you assume that there will be 10,000 textbooks by two years from now, I have 100.

If I can get each group of teachers to create 10 variations of each of these textbooks, we can get to 10,000.

And then we can train the models on that and they can cost effectively using even small models running on a local GPU.

Uh they could probably customize those, right?

So the value is in these three layers right it's hyperpersonalizing content to the needs of every student and once you gather all this information building analytical dashboards for the teachers.

If you are building a playbook for new hires at a company, you can use these same tools and you can say, "How well are my new students doing at understanding the logging standards for Python as they write code, right?

Those are all things that I wish I had when I was managing a team.

And now I could build a textbook in 10 hours and I could monitor how my team is doing learning those tools and I could build a chatbot where they could ask questions and say, "Dan, you weren't clear on this.

I want you to expand on that." Right.

Feedback is so important.

Steve, do you want to take questions now or?

Yeah.

Yeah, absolutely.

So, I'm curious because Khan Academy already does adapt, right?

It makes you pass five math questions and then says, "Okay, now you can go on." Are are you doing that or is that does that you consider that level three or anything that changes the behavior based on the student responses is level three by definition?

Level three.

Okay.

Y So what's keeping you out?

I mean they're doing it today.

I I don't want to take the risk.

I I I'm tired.

I I would rather just play around.

Wake up every day.

do what's most curious to me and turn this over to people who want to accept the risk and will build secure hardened autobutal.

By the way, the the stream of data that comes out of these books is called the experience API that goes into a standardized system called an LRS.

These are all ILE E standards for learning management.

learning LRS is a learning record store.

there are really bad ugly learning LRS systems that don't scale and are super hard.

They're written in old Java and relational databases.

It's great opportunity to build a graph-based uh system to do this.

So plenty of opportunities to build learning record stores that integrate AI.

That's the future.

I tell them all my friends, you you can expect thousands of textbooks by the end of next year.

Yeah.

Question I was going to ask with that learning record store would that or could that develop into some type of individual student based embedding representation?

Abs.

Absolutely.

I'm I I'm not going to spend too much time today on how we represent a student's journey map, but I'll show you some maps that if you use your imagination, you can figure it out.

there is a textbook out there which is not not haven't updated in six months about the exact data structures that you use in an LR LRS and the AI algorithms you use data science to predict things and it has to take into force the basian probability that people forget right and how do how often do you reinforce so it's pretty complicated but the algorithms are all there and you can ask claude how to do that right so okay so this is the the the the key this layered architecture question.

I had a great question.

So what's stopping you from skipping level three and going straight to level four because you don't need to store everything on level four.

Yeah, you you could do that.

Yeah, you can go to pretty much the the key thing is this red box is the area that you have to accept risk and and that means that you have to build a system that is auditable by outside auditors because when you say I want this textbook to run in my college they're not going to ask you is it a good textbook they're going to ask you is it safely guarded right so you're going going to be presenting to AI security risk committees for most of the sales process.

Most of the sales process is risk mitigation and not skip all that and just connect directly with learners who are interested in learning.

Oh, that that's that's another another business plan, right?

So, we can store up to 10 megabytes of data inside of every browser today and we can buy a sync tool to sync it all to S3 and give them the keys.

So they only the students can get to that data.

So yes, that is a possible learning path.

Yeah.

Very very good.

David, just in this area of navigating risk and privacy, you are gen when you generate a textbook, you're generating from content that's in the public domain, right?

And you're navigating copyright, right?

You're making sure you don't assimilate.

Yes, that's correct.

Um, so just to be really clear, all the people that I work with, I forbid them to use any copyrighted text anywhere in the book, including the course description.

Okay?

And the reason is that if you are original and authentic with the seed prompt, right?

If you think of a tree as building an intelligent textbook, it's about 10,000 branches.

About 10,000 branches.

We're going to put one seed and if anything in that includes copyright and stuff you could get take down notices but if you are original and do this then you can own the copyright and then you can give it away and then sell it to corporations currently.

But Dan is the more the risk that you are being adaptive to that individual and you are taking things that you start to know about that individual into context.

So I'm going to make something because I know data about you about your behaviors about what you how you act.

Yes.

So to me that seems like bigger risk than copyright.

well copyright is a is a is a is a small risk.

Privacy is a big risk.

Right.

And that's why companies that build at this level can charge something for it.

Sure.

Right.

most most most colleges and universities today think they can make money at owning the content for the textbooks and the curriculum.

Right.

And what they're going to have to realize is that context content will be free and the strength of any learning organization will be dependent on its ability to use analytics of the data stream coming out of the experience of the educ of the students on that content.

Okay, cool.

All right, good.

This is so important.

I'm glad everybody had a night.

Dan, what's that?

Put a quote on that bit that you just said.

That might be the quote of the night.

Yes.

Don't make money on content, make it on the analysis of the content, right?

Or who's using it.

Okay.

I just wanted to uh show you a little bit about these tools.

this is the the timeline of intelligent textbooks.

so you can see that the diamond age was published about 1995.

Isaac Azimov wrote a very interesting book back in 1951 that really the fun they had was kind of a precursor for a lot of that.

So anybody who's read Isaac Azimma really knows a lot of this.

I had to study Pia's constructionism to really understand how students learn.

So this is really important thing.

Um, if you have never heard of Bloom's taxonomy, I had heard about it.

I had no idea how important it was.

Bloom's taxonomy, by the way, is just a sixle thing of the complexity of what you try to teach.

At the base of it is what you can remember.

Memorization of facts.

At the top is what you create.

Uh, and then it's what you have to remember.

It's what you understand, how you apply it.

can you analyze it?

Can you create other things?

And so Bloom's taxonomy is the heart of everything I build.

Right.

All of the micro Sims I I design through the lens of Bloom's taxonomy.

Actually, the heart of education.

It is the heart of education.

Yeah.

So, thank you.

that is very true.

So, that was 19 56 things.

Uh and then the Gutsky's zone of proximal proximal development or CPD.

this this was the first time that I could visualize a graph of concepts.

color the ones green that the students know, color the ones red, which is their goals, and color them orange in the areas that they're ready to learn.

Right?

And so that's really how I started to visualize graphs is concepts depend on other concepts and then how to color that.

So that this all this this theory is really important.

and then you see a couple of other things the the Alex system here done by University of Irvine knowledge spaces really groundbreaking thing about representation knowledge.

but then you see this huge cluster of things and I put these are the things that really helped me increase my productivity and they've all just happened in the last couple years, right?

I I wrote blogs on GPT2 generating the simplest possible lesson plans.

My prompts were huge and I got I got a list of things to cover, right?

What are the topics in algebra?

Right?

you can get that on YouTube, but it was painful, right?

and then all of these things happen and they're getting closer and closer and closer, but as you can see, the capabilities have gone up dramatically.

So, this is kind of a graph that probably should have been reversed, but this is how I I think about it.

I want you to think of productivity on the left axis, and this is an log scale.

And if you think of a typical textbook like I wrote a book on making sense of NoSQL, 3,000 hours of work, roughly 3,000 hours, about 1.6 full-time years of my life gone writing a book.

Uh which which was fun and I learned a lot about the publishing process.

didn't make much money off of it.

But it was a labor of love because I was so frustrated that people didn't take a careful time to think about which database to use for the right business application.

and then when I really started using chat GPT I would honestly think I could generate an entire page of quality text with chat GPT at a time, right?

These little fragments.

Then I had to assemble them all together.

and that that was a big savings, right?

Instead of 3,000 hours, it g cut it down by a third, a thousand hours, right?

and then last spring, cloud code.

Oh my god.

Has how many people here have used cloud code?

Almost everybody in the room.

I am so glad.

And Shannon, you are amazing.

You've helped so many other people learn cla code and through your inspiration work other people Justin so I'm so glad you guys are all in the cloud code.

I had several of my friends who stopped talking to me because I was so insistent they learn I don't know if you remember Arun but she was one of my best friends was insistent that cursor was going to come back.

We're still waiting for that to happen.

Claude Enthropics just got the formula.

He's all about cloud code now.

Yeah.

Yeah.

He's he's he's seemed to like he seemed to like took him a while.

but some you know this is what a good engineer good engineer learns a framework and then they they want to get the most out of that learning.

and sometimes you have to make a decision to switch horses and that's that's sometimes hard.

I kept trying all three and there's this weird thing that you use Claude code and you get in this flow and it's Dan Yarmmak is probably the best Claude code programmer I've ever seen.

It's like he does the Vulcan mind meld with Claude and it's just like you can see him talking to Claude and Claude just and of course he's got this big wide ultra widecreen monitor and he types 100 words per minute and uh doesn't hurt.

So, uh, that that really made a difference, right?

So, then, uh, instead of 3,000 hours, I could kind of generate a textbook in two weeks, right?

Um, and then skills came out last October, right?

Uh, and if you haven't learned what skills are, skills are just a package of rules.

And what's amazing about Anthropic is they they were the one who really championed skills, although everybody's copying them now.

There's something about the claude model that follows the rules.

So a skill is just a folder.

It has a skills.md file that it reads.

There's a title and a description.

130 tokens goes into your context window.

So it's very small.

And then figures out when to use those rules when it breaks things down into tasks.

And then it loads that skill.md file.

And then that has all the resources, the the rules files, the template files, the Python code, things like that.

Uh, and so cloud code skills just to be it takes a while to learn how to use them, but it's just amazing.

Textbooks need to have consistency.

Consistency of writing style, consistency of quizzes, consistency of FAQs, consistency of glossery definitions, precise, concise, distinct, non-circular, uh, unencumbered definitions for all the terms in the context when they're needed, all that stuff.

Claude just follows rules better than anything else.

And every month I say, "Okay, I'm going to go out.

I'm going to try be open-minded try codecs and try antioraphy and and it can do some things.

It can generate the glosseries and a few other things and you look at the content it generates in the micros and it's just it just I don't know what it is.

it's just they'll get there eventually but they're not good at falling loose.

My biggest complaint is Gemini has this u ego that it thinks it knows better than I do.

And when it says I want you to create this micro sim and here's 15 rules to follow it says ah screw those rules I'm going to cheat myself and it's inconsistent and it adds new functions and I can't maintain it and I can't go through and do quality checks and I can't automate the layout and I can't upgrade them.

Right.

So, uh, anthropic is humble because it follows the rules and that's why I, that's why my productivity is gone so much.

Okay.

So, um, by the way, I should just mention I'm not using PowerPoint.

Uh, I actually had Claude just generate and I literally spent 20 minutes on this uh, just generate a u a tool that just, uh, displays micros text.

A question back there.

Um, yeah.

Yeah.

I was wondering from your first textbook, I think it's hard to read, but I think it's 3,000 hours.

Is that what you said?

Yeah, that's right.

to the most recent iteration where it was 10 hours.

Y can you confidently say that the quality of the content is either comparable or the same to your first attempt?

the quality is much higher.

Much much higher.

Now I when I present this to teachers they say how do you know that there are no errors?

How do you know there's no hallucination?

How do you know that every formula is correct?

And the answer is I don't.

There's no guarantees.

But what I can say with pretty good confidence that I haven't seen any major errors and the errors that I've seen are a lot of them in the the design textbooks for merging things where there's not a lot for the geometry textbooks.

It's like there's so many geometry doesn't geometry doesn't change much, right?

But if I say here's I want you to generate a new textbook on the context window and all of the hubwla about enterprises adopting an enterprise context window to put in I argue with clock quite a bit about what is best practices right because things are popular does not mean they're suitable and sometimes LLMs will pick a popular but unsuit question.

So I want to bring up the topic of order in which you present the content in the text.

I think among different textbooks on the same topic, how it's presented can be more fruitful, more effective.

So I would imagine that your textbooks AI informed are you consciously trying the content in such a way that is most effective for the learner, for the reader, because older textbooks didn't necessarily do that.

And to your point about it being like somewhat customized, right, and somewhat adapting to that individual, if I'm that individual and I go into one section and I do really well in this section, does it know that we can skip the next two sections and maybe go to the four section?

Those type of things would be brilliant.

Yes, exactly.

Um, so just these are really good questions.

Uh, I've been thinking about it for 31 years, so I think I have a little bit of insights on on how to do this.

Um, all of these are backed by something called a learning graph.

And the learning graph takes your course description and it builds a series of concepts and these arrows are concept dependencies.

and so it when it builds the textbook it never introduces a concept before its dependent elements are are available.

The other question you had is can I skip over concepts, right?

And so that's a um what do you call that?

Adaptive content presentation where you adapt as the learner indicates they ma they've mastered things very quickly.

Maybe you just skim things and and and there are algorithms for doing that.

Um these now get into basian probabilities, right?

What's the probability you should spend five minutes on this concept?

But you you nailed this other concept and they're very similar.

We're just going to go over the next one and then we'll give you a quiz at the end of the chapter to see what you do.

So adaptive is a little bit different but they're all they're all part of graph to person.

Yeah.

I'm actually not clear on something that's really based in here.

When Microsoft comes to the user, is it already prepersonalized to that user or is it more like you're creating a choose your own adventure and then everybody gets that, but then they take their own pathway through the micro.

Um, micro Sims are static programs that are generated once when the book is created and are the same for everyone.

Okay.

today.

Um, future micros when students give their history may conditionally reveal certain features, right?

So, for example, instead of one slider here, I could have this could be a a gas chamber and I could have pressure and temperature and speed and all this other stuff.

So, uh, we call this cognitive load.

for people that are new to things we give them simple interfaces as they show mastery we give them higher cognitive load micro sims and those can be enabled by a config file I don't have those today in most of these textbooks this one one for another question do you ask the questionnaire of the individual learner is there any data input on the individual learner going how is how is not not in the 2.9 level Okay.

Anytime you ask a question of a student and it's persisted, it has to be stored in a secure way, that's 3.0.

I don't have any of those in any of the textbooks yet.

Those are perfect.

I have quizzes, but they're self assessment where it gives you the question and then you see the answer, right?

As soon as you start to but and by the way, there are quiz modules you could buy and there are quiz APIs and there are quiz things like that.

So, you could have a textbook and then have it go into the qu an assessment system inside your LMS and a lot of LMS systems support this and there are standards for doing that.

So assessment is a whole separate thing but this is a typical this is the hello world of a micro sim where we have an animation we have a control and and and the user can just change the behavior of one of those things.

So okay I'm just going to go back.

I'm working on the last 10 hours right now.

that's my projects and the claude vision tool where you generate a UI and it actually sees the UI I have a database of about 1,400 UI errors that they make and they classify them and then they know the fix right so the ability for claude vision tool by the way claude doesn't generate images but it understands very well how to see your interfaces And that's been a big thing in the cloud and in the codecs and the thing to actually see the web screens in front of you.

So that's been a really big thing.

All right.

So I I think I can get down to six hours by the end of the year.

Okay.

So do you do you use a lot integrate with the things that do create all the graphic designs?

right.

Because you would you could do that.

Yeah.

Let's talk about graphics and infographics in a little bit.

Okay.

I'm going to come to that.

But the answer is yes.

I Claude is the core, but Claude doesn't generate images in infographics, but it's very good at describing those.

So, okay.

All right.

so, I have as of Tuesday, I got to level 100 2.99 books as interactive as I can make them.

I am getting level ready to build tools to go to level three using X API and the LRS the IE standards for exchanging information.

I have about 3,300 micro SIMs.

I have a site that does embeddings for micros so you can find the most similar micros.

I haven't used that yet but it's I've tested some of the stuff.

I have 308 mini graphic novels which the young kids really like.

I've been testing this with ISD 197 in the Nota Heights.

and Justin also introduced me to them.

Thank you again, Justin.

You're my savior.

and so I' I've been meeting with them to try to figure out what they and their big thing was digital citizenship.

We'll show you some of that stuff.

Very fun graphic novels targeting fifth grade students, right?

How do you create a password that nobody else can guess, right?

Something fifth graders learn.

So, a lot of graphic stories about that.

Um, a lot of I have a complete textbook on the process of automating instructional design.

Are there anybody in that has experience in instructional design there?

Yeah, a couple couple instructional designers.

Great.

So, that's that's hard instructal design really understands.

you have to learn a lot about psychology and the way you lay things out and cognitive load and all that stuff.

And then there's an entire just like we have a topic of data science there's a sister thing called the learning sciences and that really talks about the way people learn and it's a combination of psychology and vision and a lot of other things to to to you know eye tracking all this other stuff to do that and so I have a whole book on that that I'm doing and then more case studies I have So this is this is a typical what I call physics 101 simulation.

when I started to do the biology textbooks they get much more complicated because they have to have these complex drawings.

This is an animal cell.

These are the different parts the nucleus the cell bendering mitochondria ribosome cytoplasm all that stuff.

And what I found was that Claude was very good at describing this animal cell in text.

This is a two-page description.

Every shape, every color, every size, the positioning and stuff.

And I found I could feed that to the text to image models.

Chat GBT, Google's Nano Banana, truly amazing, super high quality.

Um, and early on I didn't want it to generate any text.

I wanted to control the text and where the text was positioned.

So I created an architecture.

This was about four months ago.

We called this the infographic label overlay because these labels are actually a separate layer on top that have all the hovers.

And as you click on them, uh, you can see different things and it and it highlights them and it and it then displays it down there.

The key thing about this is I didn't want to have to redo this when it was quiz time, right?

So, why not just add have it by default explore mode and then go into quiz and then and I have the hint showing here where you actually have to click on the right box to do that.

So, you can use the drawings and use the overlay to label things and So this is a what we call a type of micro simul.

So microsums it's not just quote physics simulation.

It's really any interactive graphic where the learner uses the mouse to either hover over click that we can extract that to understand whether they understand the concepts.

Is there a skill to generate these micros?

I'm sorry.

A skill.

Oh yeah.

Yeah.

Absolutely.

Absolutely.

Every one of these types has its own skill within actually I should say sometimes there are separate skills.

Sometimes I have a master micro generator guide and there's a rule base that picks the right type based on your thing.

So if it's a biology representation or a plant or things like that that require drawing then there's things it it can put the description in.

can call the APIs and do it.

Uh, and sometimes I just copy and paste it because I just want to play around with it.

So, a question.

How accurate they can generates the pictures?

How how accurate?

That's that's a good question.

I have biology textbooks and I've compared it I've also compared ChachiPT's images with Google's and I'd say for educational purposes where you're just learning the basic structure of the cell it's okay.

I have tried more complicated medical school textbooks and I would say about 5050 that they are correct.

for plant identification, Arun is not here.

Arun is doing a book on native Minnesota native plants and his illustrations using the same frameworks are truly amazing.

so yeah, it's it's it's pretty good for some things.

and part of this is there's if you go online, you type Google sell.

There's hundreds of hundreds and hundreds that come up and they just grab the Google picture and implement into your textbook rather than generate something really as long as those images are licensed consistent with the creative comments.

If it's if they're on Wikipedia, no problem.

Usually, right?

But I never ever touch anything that has a little copyright or a name of a company.

I can use it as a way to test, right?

I can compare this with 10 other pictures of animal cell and see whether right but you know mitochondria those things are all all very very similar and those things.

So yeah so that looks like almost any other things right.

Okay.

Are you integrating with are you using integrating the course with the no expert everything is just straight skills.

Are you using skills reliably?

Right.

So Claude is infamous for not using a skill even if you strongly hint at it.

Is each skill associated with an agent that just does that one skill?

That's a really good point.

You have these skills.

The skills have a description and they're ignored by CL.

So, by the way, this is a known bug and the discussion boards have lots of discussion.

Claude used to have a opaque budget for skill descriptions of 130 tokens per skill description.

And if you exceeded that, it just magically didn't.

some of them and it wouldn't tell you which ones it didn't see.

Yeah.

All the latest versions in the last three months have a very clear skill budget and it's a configuration.

It's set by default to be 1% of your context window and a 1 million token context window.

You can have a lot of skills in sonnet which I use for most of my things.

I have a much I have 200,000 token context much smaller token.

So, I've had to refactor my skills multiple times where I find similar skills, I group them together into one and say, if you have something like this, go into this and then it's a big switch table that goes.

So, it's it's an art form to know the bugs of these systems.

But I will say that compared to Codeex and Gemini, Claude is still way way better at at following rules and finding There's another thing is if you know there's a skill and you put in slash in the skill named identify it.

So usually when I'm building a book I know the names of my skills and so my my goal is still to make it easier for a teacher to do this and I think we have some people that have used my tools without any training and they've still figured out how to get it to work but they're not my focus hasn't been on ease of use but it will be in the future.

I ask Matt N question.

pass at it and make sure that everything is there.

No, but I should great idea.

You said it was good, right?

Yeah.

Yeah.

I I should say I go back and forth.

the ver I have I've all these verification steps when I build a book and especially early on when you have a course description I have a 100 point metric and I never let you go on till you get at least 85 out of 100 right so the quality is really important at the beginning as you go down and you build the micros I don't spend a lot of tokens double checking because there's a lot of micros and I'm very conscious that my teachers have $20 and they have a 5hour window to use 200,000 tokens with OBS.

It's really effectively or Sonic it's effectively 2 million.

so I'm very very Dan and I have spent a lot of time doing metrics.

I have a friend who does nothing but dashboards for tokconomics.

and so we're very by the way I'm running behind so I'm gonna pick it up so I get some of the other things.

One more question.

How much is it cost to for you to generate?

My my goal is to have the average book for maybe 200 page something like that.

Yeah.

My goal is to generate a,200 page textbook in four fivehour token windows.

How much that cost?

it depends.

But if I if you get Claude Pro, which is $20 a month if you get one month, 17 if you sign up for a year, you can generate a dozen textbooks a month for $20.

So, and I'm working on trying to make it even better.

Uh, and it your mileage varies based on the complexity of the microser content.

It's it's pretty straightforward.

And I have tables that show how to predict how many tokens you're going to need.

Uh, but anthropic gives you free tokens if you do weekends and night.

And that's really hard to figure out that stuff.

So, okay.

All right, I'm going to just go through to show you a couple more things on lesson learners.

this is one from the ecology book.

I don't know if you guys know about the cycles, the carbon cycle, nitrogen cycle, all this other stuff.

phosphorus cycle, water cycle.

and this also has a question, but I also added another one called what would be the human impact on these?

And it shows you if there's pollution, what the impact of the things.

So really really good interactive diagrams and and this the the diagram for this is four pages of text right that I had cla generate to do this one.

all right I think I'm just going to skip through this.

All of the stuff is online.

There is a book on how to generate intell code skills.

But basically start with course description, generate the learning graph, we generate the chapters.

The chapter design is a very critical piece because it has to pick concepts and put them together.

We want to make sure chapters are balanced.

They're not too long.

They're not too things typical chapters are 15 concepts that are explained for high school, maybe 20 to 25 for advanced graduate school, college things.

and then once you have the the ch the the chapters designed then we start to put in the personality, what's the tone, what's the audience, what's the reading level, uh is it fun and humorous or is it other other things optimistic?

Uh where do we put in the encourage critical thinking skills?

Where do we put in thinking skills?

Where do we put in understanding cognitive bias of the people around us?

and where do we put in the ability to detect misinformation online.

So those are all things and then these are just some samples.

Just so you know all the books have these views.

Some are a little bit older but what I encourage people do is do an uncheck all and then slowly do a build.

Right?

So I'm going to see what the foundation concepts are and then what's the development environment and then the terms and definitions and and so this is just building up and it shows you that this is these are related concepts.

This is not chapter order though.

this is how are concepts related and so if a student wants to get to some goal how what is the path to guidance?

So if you imagine this whole thing as being gray and as the students learn they turn green and then the ones around the greens are orange those are the ready tolearn uh zone of proximal development.

Right?

So this is the guiding star for the book for hyperpersonalized learning.

Okay.

All right.

So it's all about making sure you can represent that knowledge in a way book mascots.

This is the biggest thing that has had an impact for my students retention is to and I asked Claude this right I didn't know this I said how do I increase my engagement and it gave me a list of 20 things and then I started experiment and the one things I did if you all all of my books have a Google analytics right so I can see when I give it to some sample students how long they engage and the engagement goes up by about 30% just by adding the mascots.

I know that sounds silly, but it is a proven there's a lot of data that proves that if you anthropomize your friend online, and these are all friendly characters.

They're designed by Claude.

And then I give them to the other two that do this.

the the Shrottier students at the University of Minnesota came up with the Spark Sparky the light bulb and that's their mascot for the intro circus class.

Wonderful.

Right.

Seniors in high school love their stickers.

Yeah.

Yeah.

Yeah.

And so all the college books have these guys too by the way.

So this is the fluffy soft pillow for the understanding dementia book that Rick Tandler has done who's traveling around the Minnesota showing the book to healthcare organizations.

So so what I wanted to do is encourage you this is a lot.

We're telling you a lot today.

You don't have to do it all in one shot.

Uh, but I want you to start to realize that there there is a staging area that you can start to do this.

And once you get to these clawed skills, uh, I think you'll find that your productivity really does go up.

Um, and uh, and I I just think the world is going to be very a much better place when you've educated students.

Um, all right.

So um all right so what's the goal?

The goal here is the democratization of education for students around the world.

Right?

Every student on every country on every continent should be able to ex have this rich educational experience just like Nell did in the book Diamond Age.

And the biggest problem I have is that when I show this to people, they don't believe me.

they they simply don't believe that they can generate an intelligent textbook in 10 hours.

So I asking everybody in the room to go tell two or three friends and hopefully they'll tell a few people and hopefully we'll get the word out that we can start to democratize education for everyone in All right.

how early have you gone?

How what age?

Fifth grade.

fifth grade is I I do have some stuff for kindergarten teaching things but it's mostly letter block games you know that don't read much but fifth grade is usually the things and then for the rest is it's mostly small things I have a teacher in St.

Paul I built the reading for kindergarten and it it is fun but in general it's about fifth graders I just want to acknowledge Dan work on the paper which we submitted to archive a month ago and they still haven't gotten back to us.

Obviously they've gotten flooded AI generated papers so it's much longer but it is all about not at at the level three and four it's not just can I build a chatbot can I do it cost effectively how do I minimize the use of tokens and Dan's brilliant work on that token minimization is just fantastic he's taking it in great directions all right so with that I guess we've been asking questions all along Okay.

So, you're calling these textbooks, but they don't really seem like textbooks.

Um, so like what is the kind of the scope of going with these things?

Is it something that they teach in a year of class or do you know what I mean?

It seems kind of limiting in a way.

Yeah.

so when I design the textbooks usually give a number of weeks in class and the audience and then the number of concepts changes based on that.

Um, so, uh, I I wish I could have the resources to do studies of this, do AB testing, give two classes, one with the general textbook and one with the paper book, and then look at that.

There there are uh, you big educational organizations that try to do that funding.

but all I can tell you is that the teachers that I work with once they get engaged their students seem to like it and and they much prefer the the animated things.

Uh, and just this idea that you have this welcoming character and you have all these micro sims and you know lots lots of lots of micros that tell you and you know lots of mini workflows where you hover over things and have to do those things.

So there's all sorts of simulators that we can build and the simulators should be questioned, right?

You should say, is this I one of the prompts I use is assume you're a senior instructional designer.

Take a look at this micros and find out whether it's meeting all the guidelines for cognitive load for this student and should I take out controls?

Should I add controls?

how do I make it better?

Um, so I I don't want you to think that anything here is pixel perfect and perfectly optimized for cognitive load.

It's it's an experiment and the way you prove or disprove a hypothesis is to test it and we're not at that stage yet.

So another question.

Yeah.

So it seems every student is getting the same sort of subunits here, right?

Yes.

In practice in the classroom, how personalized is it really?

Right.

I mean seems like everybody's actually getting the same thing traditionally what you want right so can you maybe how do two students get different things here maybe a two example of that well once again it's not my not my focus of level twos hyperpersonalization is a level three issue so I would say right now it's really one textbook and the instructor can say go through as many chapters as you Maybe you have five extra chapters for advanced students or special projects.

Um, I should should mention one thing.

Uh, there's this thing called the Alpha Schools.

Alpha Schools is a forprofit school system, $65,000 per student per year.

Uh, and they only spend two to two, three hours on the AI content.

The rest of that is social interaction where they're in clubs and projects and robotics and things like that.

So of the eight hour day, three hours is with the AI and the five hours are with social, right?

To spend more time developing your interpersonal skills, right?

Which is harder to do.

So, so the idea is that we make it fun and engaging so that you can get more time working on sports teams and athletics and volunteer work in the community and all that stuff.

Uh, so this is the Alpha Schools is the most we're hoping that that $65,000 price tag comes up, but they they spent $10 million building theirs and I think within a couple years every school could have the same AI that alpha schools had I was reading some research from before LLMs and interactive tutors and they had some impressive like full sigma improvement over you know one standard deviation over textbook reading which sounded really impressive and then I read in the the notes that they also then controlled for someone who did no textbook reading versus textbook reading and then there was like the teeniest apparently reading a textbook for two hours has no value right I'm wondering like what do you think the value of text is that links those together it's like the text supports the instructor but does it actually sports student or is there another way to do that?

Um, what what I will say is that I'm very pro- teacher, right?

All of my history and my family, my brother is a teacher, my sister is a teacher.

Um, a great teacher can make a world of difference.

You can have a really crappy textbook and a great learning experience if you have a great teacher.

The problem is that not everybody in the world has access to great teachers.

So I I just will say that the value of textbooks is minimal if you have an environment that is nurturing for you for learning.

having kids going out on field trips and studying moss is much better than reading a textbook about moss.

So makes me imagine that two one is a book for the teacher and then you actually Maybe half of the guide is actually about helping the teacher and the other half is about the classroom.

Yeah.

One one little anecdic science and she she didn't have a textbook.

She just built it on her own.

She found some research online, but she went to a hair salon and got different colors of hair and put them all in envelopes and kids had to figure out who had what color hair under the microscope, right?

So she went out and figured out she had to get that sample in of hair.

So that's an idea.

Great teachers are very creative at finding ways for students to learn science and and whe and how do you make it fun and how do you make it engaging?

By the way, I wanted to show you the this is one of the ones I generated this last week.

This is semiconductor physics.

and this has 600 concepts in it, right?

600 concepts.

and the quality of the text is still pretty good.

and we've started to share some of this with people at the University of Minnesota.

but the key thing about this in in semiconductor physics is that you really have to have a great background in a lot of areas and if you don't have the background this book has some of the background material and pointers to the other books and things so so that that that we can really get students at the University of Minnesota that are globally competitive.

I really believe that lack of really good interactive fun textbooks is what I have a question.

Yes.

So how would you integrate it into some kind of an system let's say canvas or something that we at university are using and this next question would be why not have some kind of a tailored homeworks right I mean you did not have homeworks here I would like to see if it was I mean if you Yes, you're you're absolutely right.

I do not have homework in here.

But what I wanted to do is just show you uh some of the anyway we do this this is a book uh on the XAPI system and it has all the workflows for getting data out of the intelligence systems and into the learning record stores.

and it's it's relatively simple in theory.

you have who did what to what object and that's serialized in a JSON data stream with standards and then you can pump that all into that and and do a lot of So when you enroll a student you assign them this book and then you can do simple things like have open the chapter, right?

and you can do complicate things.

Have they gone through and run simulation 25?

And realize that if you boil the water too long, the water evaporates and the heat goes up, right?

So those are all uh things that the these X APIs are designed they're designed for supporting simulations.

Canvas charges $5,000 a year for them to list it in their system.

I know that for to list to list what?

whatever you're adding to your system because I just tried to do it the other day.

So, maybe after I make money on Moodle is free, but it's not a very good user interface.

Talk to me afterwards.

Who cares?

No, I'm seriously I can see Dan was going to answer the same way.

I don't care about user interfaces anymore.

My user interface is cloud code.

But the student that that's for people generating interfaces, right?

For the students, it's different.

Yeah.

Okay.

Fair.

But all of the things about assigning the students the projects the chapters work assignments.

there are quizzes in these allowing them to hook when they do the quizzes have them go into the LMS storing this.

Canvas also is known as a large grain system.

they don't really recommend content in canvas whereas all the new AI based LMS that's what they should be doing they should be recommending canvas so so there's one one other thing I just wanted to mention real quick is um one of the keys about AI is to understand the idea of similarity similarity right the old world is about databases that are good at counting and totaling and amounts called the counts and amounts rule.

AI is not about counting.

It's about finding similar things.

Right?

So here I just ran a simple embedding on the images for the mascots.

And you can see that the mascots up here that are kind of fox and raccoon like are all together.

the bird mascots are here, the frogs and the turtles and things like that.

and the the strange robots are down here.

Right?

So it's important that we realize that we have these tools to find similar things.

So I've only just started to crack the thing about finding similar micros.

I do have algorithms that do embeddings, but micros have two dimensions.

It's the learning objective.

it is p5 js but I have timelines I have flowcharts mermaid is everywhere now in a lot of the books mermaid is native to a lot of the book building tools so maintaining mermaid diagrams flowcharts things like that vin diagrams now with the lattice release so much easier to do it so we have to realize that we're only the tip of the iceberg of what can be done here.

And I think if you start to understand embeddings and how we can store embeddings for learning things and it's not just similar mascots, it's similar micros, it's similar quizzes, it's similar exercises.

All of this similarity will help us build better high quality textbooks faster with lower cost.

this.

All right, great.

U we have a few more things.

David, do you want to just mention real quick your progress?

Yeah, just why don't you just talk a little bit about that?

Yeah, you shared your pipeline really interesting process.

I would say I can do it a t-shirt after the first step is what Dan will tell you is the course description is key.

That's like the seed and that's not a trivial project.

I I thought oh just follow the course description that was a significant effort.

I did it in the area in which kind of created my own content as I have my own methodology.

I thought oh why don't I write and so got to the course description and I was probably a little compulsive I knew nothing.

I had an exposerated I actually got to 100 said, "Okay, that should be a good enough place to to start." And the other thing I did is I actually installed CL code on a Chromebook.

Chromebook.

First person I've ever seen install CLA code on a Chromebook because I didn't know I was supposed to do it.

that's my discover stumble in that direction.

So I figure that's got to be representative of maybe the toolkit that that a poor teacher in Africa might.

So and then going back and past the course description generating the knowledge graph which is it's it's just like or the learning graph learning graph to me that's it's just an amazing amazing concept to say my my book has 200 concepts in it and to arrange them in predecessor successor order I think is just a fundamental approach that really changes is every the way the way we write I'm the nonlinear thinker I wanted to write the chapter in a nonlinear way Dan's got the pipeline is a real smooth operation and I guess the the other thing I'll mention is because it's in my context it's not like I could pull in other you know external sources you know it.

So that makes it like a little bit of you know different adventure and may not be like standard cases you know we generate geometry textbook text I think I'm going to probably have to go back and validate some of the Dan you also have several students from your class that generated some textbooks I think that was Jessica, I think your your project was truly amazing.

Would you be willing to just speak for a minute about what your impressions are?

Absolutely.

Yeah.

Yeah.

Seriously.

Yeah.

Yeah.

You're you're turning around.

You're a good example of a student that we wanted to show that can use it.

So, yeah.

Well, actually, there's a microphone.

So, go ahead.

Thank you.

Um, good evening everyone.

My name is Jessica Pup.

I'm a STEM MBA student at the University of St.

Thomas, a student of Dan Yamok and as you mentioned, we created amazing projects this semester off of the frameworks that both Dan's taught us in our classes.

I didn't prepare anything to show but I do want to share my u a bit about my intelligent textbook that I created and the product that I was able to design using the intelligent textbook.

so my project was strategic marketing in the AI age from brand management to autonomous growth engines.

And so a little bit about the course description.

This intelligent textbook transforms marketing professionals from tactical executors into strategic architects of AI powered growth systems.

Moving far beyond basic prompt engineering, you'll learn to design autonomous marketing engines that blend brand strategy, ethical automation, and scalable personal personalization.

This course bridges classical marketing frameworks with cutting edge AI capabilities, teaching you to build systems that learn, adapt, and optimize across customer life cycles while maintaining brand integrity and ethical standards.

Um, so 200 topics, 20 chapters, um, about 3,000 pages.

I used my own intelligent textbook to then create an agentic system.

It's a brand strategy system called brand voice.

and what that does it it uses agents to simulate real world or real life um rather consumer segments and competitor sets.

it ingests real life data.

you can actually have conversations with this system and it basically helps you create and stress test a brand strategy and your positioning using these agents that deliberate with each other.

So, it's about five agents.

Um, so far I've created three customer personas and three competitor personas.

So, there's a conversational layer.

You can actually It actually interviews you.

This is so amazing.

She's building simulators of customers and competitors.

Truly amazing.

really amazing and I'm glad you brought that up because I am looking for design partners and we're at a stage where we are demoing and stress testing the platform.

So if anybody is in marketing let's connect and see where we can take this.

I guess I know somebody that used to work for General.

Okay.

That would be great.

Jessica, thank you.

And yeah, that's my use case, I guess.

Yeah.

Thank you, Jessica.

That's you're a great testimonial.

Dan, you had what 13?

Yeah, there were 13 students just like Jessica.

What was interesting is the base of the knowledge graph taking directions obviously so you can traverse the graph you can see multicausal things introduction other ways but the learning adventure is great and don't reduce it to textbooks right so Jessica pointed at a problem set it's information that was what I did with it I pointed it elsewhere so Dan can point claude and a website effectively create a course description from the website and generate a knowledge graph of a company and generate the proposal with cla truly amazing very so the knowledge graph it's testimony to knowledge graph dag you know this is his handing subtask you're benefiting from some of the best computer science living that we So I take advantage of that because the accuracy is what's fantastic right it's the accuracy that lets you guys explore so even if you make a textbook remember if you point it over there don't need to use context you can point it summarizes so file it's really cool okay I think every one of the 13 students has a potential to start their own business based on their project thanks to your textbooks I I just want to say if you're able to break the strangle hold of the publisher cartels, this is what's going to ultimately happen here.

You know, lipidot Thompson Reuters sell a $200 textbook that just reverses, you know, a couple of chapters and that's the new edition that now you have five student most people here were college students at one point, right?

So you remember this West Publishing the more power to you.

Yeah.

that's yeah, that's a that's a great thing.

I I think the world is going through disruption.

I think remember Encyclopedia Britannica used to have this huge strangle hold until in Carta came out on seas.

We're seeing going to see the same thing with intelligent textbooks but it's going to be a worldwide impact and what it means is that we're going to have a much much more educated and let's just hope that the ability to detect misinformation is front and center so we have less people that are easily duped by our politicians.

Okay.