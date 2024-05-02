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
Multi-modal learning analytics uses data streams of different modalities to analyze and provide feedback to researchers/educators on overall performance of students performing a learning activity, typically using computers. Depending on the nature of the activity, analyses can range from affect detection, log analysis, audio transcription etc... among others. Some of these analytics methods are available in realtime. 

MM collection in a typical classroom research project(usually ranging from few days to months), for each session, students are assigned a particular learning experience, these learning experiences are usually gamified(some are even games) that the students play. For each session, depending on the kinds of analysis needed, researchers usually collect application logs, students' audio and video, overall classroom video/audio, teacher/researchers' interviews, data from a wide array of sensors like eye trackers, heartbeat sensors, positional data etc... Well, That's a lot right? Complicating things, the systems generating this volume of data are isolated, controlled by different actors and are built using a wide array of tools/technologies and usually there isn't a level of synergy between them. Additionally, for a session(running from a few minutes to an hour or two), a unified timeline is needed to do a segmented analysis, such that all the collected data can be analyzed as a whole or in segments.


Here, I have itemized a list of challenges on collecting and analyzing multi modal data for learning analytics. Some of these are purely technical in nature, while others are philosophical concerns affecting the technical implementations at a fundamental level. 

1. **Integration**: Combining data from diverse sources and formats is probably the most tedious aspect of collecting multi-modal data. Firstly, there are a wide range of devices and sensors (multi-modal) used in MMLA research. Anecdotally, here at [OELE](https://github.com/oele-isis-vanderbilt), we have worked with different sensors including but not limited to audio interfaces, Tobii glasses, web cameras, wireless microphones, stereo cameras, Kinect, etc. The first integration challenge is to write appropriate streaming and control software to get data from the device(s) because of the diversity in devices and their control SDK encompassing various programming languages, frameworks, and software patterns. The second integration challenge arises in getting application logs/other data from a wide array of learning environments (mentioned above). Not only are these learning environments themselves built using a plethora of technologies, but they also employ various strategies for user management and differ in their business logic, such that a unified interface to getting application logs is challenging. A silver lining in this context, however, is that most of these applications are served from the browser, so, a single JavaScript SDK can provide a solution, especially if we intended to use client-side JavaScript. The integration of multi-modal data for classroom research is further complicated by its hierarchical structure, which may include both group and individual data layers, and these boundaries are not so well defined.
<br/>
<br/>
2. **Synchronization**: Aligning data streams to a unified timeline poses another significant challenge in multimodal data collection, especially when there are multiple sensors streaming data at different bit rates and with actors (both human and sensors) having different times of entry and exit. Any MMLA data collection ecosystem should be deemed useless if it doesn't guarantee synchronization of the modalities such that all the collected data can be analyzed as a whole or in segments.
<br/>
<br/>
3. **Privacy**: Managing sensitive information, especially with audio and video recordings, poses another set of challenges in multimodal data collection. To an external observer, a multimodal data collection system for MMLA can appear no different from an advanced surveillance system, bringing with it all the associated privacy concerns. There should be sufficient privacy guardrails in place such that participants are anonymized from the outset, and we should follow proper guidelines on how identifiable data is collected and shared, adhering to IRB and compliance policies. This domain cannot and should not operate like a leeching corporation, where a 100-page privacy policy document allows one to get away with daylight robbery. While this is not a direct technical concern or challenge, addressing privacy concerns can and should guide the architecture of an MMLA data collection system.
<br/>
<br/>
4. **Scalability**: Handling large volumes of data generated from multiple modalities and users poses a technical challenge, similar to other software engineering domains, when issues of scale must be addressed. Scaling becomes particularly challenging with video and audio data, as they tend to consume substantial system bandwidth and require significant disk storage. 
<br/>
<br/>

8. **Data Quality**: Maintaining high standards of accuracy and reliability in data poses significant challenges, including addressing device failures and bugs in various closed, lightly coupled systems. Ensuring consistency across different modalities, especially when they are subject to variable environmental conditions or differing operational standards, further complicates this issue.
<br/>
<br/>

9. **Resource Intensity**: Managing the significant resources required for data processing and storage involves not only substantial financial costs but also technical considerations such as optimizing data throughput and storage efficiency. The complexity increases as the volume and variety of data expand, requiring more robust and scalable infrastructure solutions.
<br/>
<br/>

10. **Ethical Concerns**: Addressing ethical issues around surveillance and consent in educational settings is critical. It involves navigating privacy laws, securing informed consent from participants, and maintaining transparency about data use. These concerns are especially acute given the intrusive nature of some data collection methods, such as continuous video and audio monitoring, which can raise significant privacy and ethical red flags.

Overall, these challenges need to be addressed when developing systems for multi modal data collection for learning analytics. To that end, our goal through out the endeavor was to develop and build integration channels for the exact system, which we will aptly call the **_Multi Modal Learning Analytics Pipeline_** (MMLA Pipeline)

## The V1: ChimeraPy

_ChimeraPy is a distributed computing framework for multimodal data dollection, processing, and feedback. It’s a real-time streaming tool that leverages from a distributed cluster to empower AI-driven applications._

![ChimeraPy Architecture](images/DaysOfCollection/chimerapy-architecture.png)
_Detailed System Diagram for ChimeraPy: Broken into 2 sections: (1) Framework Interface, composed of the Manager, Worker, and Node, performs the cluster setup, configuration, execution, and data aggregation. (2) Application Interface, made up of a CLI, plugin registry, REST API, and a Web app, provides the tooling and scaffolding for pipeline design, deployment, and orchestration._

When I joined [OELE](wp0.vanderbilt.edu/oele), [Eduardo](https://wp0.vanderbilt.edu/oele/eduardo-davalos/) had already started working on a multi-modal data collection system, which he had named [_ChimeraPy_](https://github.com/ChimeraPy). The name _Chimera[Py]_ comes from the Greek mythology of a creature with the head of a lion, the body of a goat and the tail of a serpant, which he thought would be a befitting name for a system that integrates data from diverse sources. The first iteration of _ChimeraPy_ included a client-server architecture with WebSockets, which eduardo eventually had finished refactoring to use ZeroMQ sockets, by the time I had joined. At the barebones, 


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