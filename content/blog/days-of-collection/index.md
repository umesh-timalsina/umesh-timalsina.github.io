---
title: "Days of Collection, Days of Despair"
description: "Experiences from Integrating Livekit for Multimodal Learning Analytics Data Collection"
summary: "Experiences from Integrating Livekit for Multimodal Learning Analytics Data Collection"
date: 2024-04-25T16:27:22+02:00
lastmod: 2024-04-25T16:27:22+02:00
draft: false
weight: 50
categories: []
tags: ["tech"]
contributors: []
pinned: false
homepage: false
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: true # false (default) or true
---
{{< img process="fill 5000x900" lqip="21x webp q20" loading="eager" fetchpriority="high" src="images/DaysOfCollection/livekit-mmla.png" alt="livekit-mmla" >}}

## Introduction
In my relative short stint at [Open Ended Learning Environments lab(OELE)](https://wp0.vanderbilt.edu/oele/) at Vanderbilt University, I quickly found that learning science research and the core concepts are way above my pay grade, and something that I am not particularly interested in. However, as with any research domain, there are various aspects in which richer computer science theory / tooling can not only streamline the processes in a domain, but also provide richer context and evidences to support / disregard what are the core theories in that domain.  This was my initial days of foraying into multimedia streaming and Multi-modal collection in general. This blog post is a reflection of challenges faced, good and not so good experiences and design decisions and the road ahead for this direction and what I learned from almost an year's worth of work in this domain.

But even before that, my current role came into existence followed by an unfortunate end to a previous [DARPA project](https://github.com/symbench) and thanks to the [NSF Engage AI institute](https://engageai.org) for investing in a Multi-modal learning analytics strand and delegating [OELE](https://wp0.vanderbilt.edu/oele/) as its leader, for which I was hired to develop and test platform and infrastructure for collecting and analysis of Multi-modal data for education, specifically, for the classroom studies conducted with the learning environments like [C2STEM](https://www.c2stem.org/), [Betty's Brain](https://news.vanderbilt.edu/2008/03/11/bettys_brain_motivates_learning/), [GEM-STEP](https://embodiedplay.org/) and [EcoJourneys](https://www.intellimedia.ncsu.edu/projects/) etc... by the researchers in the institute. The eventual goal of this project is to come up with a unified software architecture to collect and process multi-modal data from these learning environments at scale, with a goal to (a.) Automate some of the tedious processes ([discussed more below](#mmla-collection-v1)) within the domain and (b.) Generate meaningful artifacts as feedback to learning environments and researchers for tangible research outcomes as well as enhanced teacher/students' experiences for teaching/learning.   

## MMLA Collection and Processing
Multi-modal learning analytics uses data streams of different modalities to analyze and provide feedback to researchers/educators on overall performance of students performing a learning activity, typically using computers. Depending on the nature of the activity, analyses can range from affect detection, log analysis, audio transcription etc... among others.

MM collection in a typical classroom research project (usually ranging from few days to months), for each session, students are assigned a particular learning experience, these learning experiences are usually gamified (some are even games) that the students play. For each session, depending on the kinds of analysis needed, researchers usually collect application logs, students' audio and video, overall classroom video/audio, teacher/researchers' interviews, data from a wide array of sensors like eye trackers, heartbeat sensors, positional data etc... Well, That's a lot right? Complicating things, the systems generating this volume of data are isolated, controlled by different actors and are built using a wide array of tools/technologies and usually there isn't a level of synergy between them. Additionally, for a session (running from a few minutes to an hour or two), a unified timeline is needed to do a segmented analysis, such that all the collected data can be analyzed as a whole or in segments.


Here, I have itemized a list of challenges on collecting and analyzing multi modal data for learning analytics. Some of these are purely technical in nature, while others are philosophical concerns affecting the technical implementations at a fundamental level.

1. **Integration**: Combining data from diverse sources and formats is probably the most tedious aspect of collecting multi modal data. Firstly, there are a wide range of devices and sensors(multi modal) used in MMLA research Anecdotally, here at [OELE](https://github.com/oele-isis-vanderbilt), we have worked with different sensors including but not limited to audio interfaces, Tobii glasses, web cameras, wireless microphones, stereo cameras, Kinect etc... 
One aspect of this integration challenge is to write appropriate streaming and control software to get data from the device. The other aspects includes handling data from the learning environments  


2. **Synchronization**: Aligning data streams to a unified timeline for coherent analysis.
3. **Privacy**: Managing sensitive information, especially with audio and video recordings.
4. **Scalability**: Handling large volumes of data generated from multiple modalities.
5. **Complexity**: Dealing with the technical intricacies of various data collection tools and technologies.
6. **Access**: Navigating the permissions and controls set by different data custodians.
7. **Interoperability**: Ensuring that different systems and software can work together efficiently.
8. **Data Quality**: Maintaining high standards of accuracy and reliability in data.
9. **Resource Intensity**: Managing the significant resources required for data processing and storage.
10. **Ethical Concerns**: Addressing ethical issues around surveillance and consent in educational settings.


## The V1: ChimeraPy


## GEMSTEP Fall 2023

## The Shift to Livekit: A Rationale

## Deep Dive into LiveKit Integration: LivekitMMLA

## IACT Study: Spring 2024

## Practical Outcomes and Experiences

## Lessons Learned and Best Practices

## The Road Ahead

## Conclusion

## Call To Action

## Special Mention to Eduardo

## Thanks NSF