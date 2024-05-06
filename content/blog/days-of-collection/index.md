---
title: "Days of Collection, Days of Despair"
description: "A tale of evolution from ChimeraPy to Livekit-MMLA"
summary: "A tale of evolution from ChimeraPy to Livekit-MMLA"
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
*Note: This document was reviewed and corrected for spelling and grammar with the assistance of AI-based tools.*

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


When I joined [OELE](wp0.vanderbilt.edu/oele), [Eduardo](https://wp0.vanderbilt.edu/oele/eduardo-davalos/) had already started working on a multi-modal data collection system, which he had named [_ChimeraPy_](https://github.com/ChimeraPy). The name _Chimera[Py]_ comes from Greek mythology, describing a creature with the head of a lion, the body of a goat, and the tail of a serpent, which he thought would be a fitting name for a system that integrates data from diverse sources. The first iteration of _ChimeraPy_ included a client-server architecture with WebSockets to stream data, which Eduardo had finished refactoring to use ZeroMQ sockets by the time I had joined. At its core, _ChimeraPy_ used an HTTP Server as a "**Manager**", which could be discovered by clients on the network called "**Workers**". The workers would register themselves as available to take on a streaming task. The streaming architecture used Directed Acyclic Graphs (DAGs), and the node in a graph was a basic unit of computation that would either generate or consume data. These nodes were implemented as Python processes that would eventually be pickled and delivered to workers based on a mapping provided, a process known as `Commit-Graph` in ChimeraPy lingo. For example, if we wanted to create a face detection pipeline using, say, YOLO with a web camera, we would first create the following graph:
<br/>
<br/>
![alt text](images/DaysOfCollection/yolo-dag.png)

*A simple YOLO Face Detection Pipeline, represented as a DAG in ChimeraPy*

In this case, depending on the workers available for a particular cluster instance, we would create a mapping (many-to-one) between nodes and workers. For instance, if we had a GPU machine to run YOLO and another machine to handle the camera and display, we would register two workers with the manager. Then, the action to commit the graph would involve distributing nodes to the workers according to the provided mapping, as shown in the figure below:

![alt text](/images/DaysOfCollection/commit-graph-action.png)

*A visual depiction of the commit graph action in ChimeraPy*


In the context of this data flow architecture, each `Node` must implement three critical functions: `setup`, `step`, and `teardown`. During the `setup` phase, the node initializes all necessary resources, such as capturing data inputs and loading models (e.g., YOLO for image recognition tasks). The `step` function is executed repetitively to process data in a streaming manner. Finally, the `teardown` function is called to release resources when the node's operation is completed. Importantly, the nature of each node’s communication role in the graph is determined by its edges: nodes on the outbound edges act as publishers, disseminating data to subsequent nodes, while nodes on the inbound edges serve as subscribers, receiving data from preceding nodes in the graph. Further details of the actual streaming architecture and the whole ecosystem can be found in our paper, linked [here](https://ieeexplore.ieee.org/document/10386382).

So far, we have only discussed the streaming aspects of ChimeraPy; however, as previously noted, streaming and processing multimodal data is only one aspect, and storage is another. In ChimeraPy, rather than using a centralized entity to record individual modalities, the data is recorded by individual workers executing the nodes. After the streaming operation is over (the manager is directed to stop), the recorded data is packaged and sent to the Manager via network file transfer. This approach strikes the right balance between not having to use too many sockets to record data and achieving centralized collection. Additionally, the Node in ChimeraPy provides built-in support to record video, audio, text, JSON, etc., via parametric functions that users can utilize in its `step` function to save the data generated by the Node.

The bare bones of the streaming system were ready, although we had to handle numerous bug fixes and pattern changes. Eduardo was already using the system to collect data for his [Reading Project](https://github.com/RedForestAI/reading_experiment_codes), with some level of success. However, there were various shortcomings and additional features we wanted to cover. First of all, we realized that DAG construction via Python scripts was untenable due to the portability issues of those scripts. Secondly, we needed a configurable way to reuse the nodes that we wrote for a project and to create an ecosystem of reusable nodes. Thirdly, since this system was intended to be used by researchers, we wanted to employ concepts from meta-programming so that nodes and the DAG could be created and deployed from a web dashboard. This led to the development of [`ChimeraPy/Orchestrator`](https://github.com/ChimeraPy/Orchestrator) and the eventual refactoring of the networking engine from [`ChimeraPy`](https://github.com/ChimeraPy) to [`ChimeraPy/Engine`](https://github.com/ChimeraPy/Engine). The ChimeraPyOrchestrator would eventually provide reusable nodes and an orchestration scheme/dashboard application for ChimeraPy with JSON configuration. We also created [`ChimeraPy/Pipelines`](https://github.com/ChimeraPy/Pipelines), a repository of shareable ChimeraPy pipelines. Leveraging the `Orchestrator` and `Engine` constructs, we achieved an application interface for the ChimeraPy framework, which we used for writing various MMLA collection and analytics applications. There were quite a few feature backlogs as well as bug fixes needed, but we had achieved a functional CLI and system for using reusable software to stream, process, and collect multi-modal data, leading to the following system diagram.

![ChimeraPy Architecture](images/DaysOfCollection/chimerapy-architecture.png)

_Detailed System Diagram for ChimeraPy: Broken into 2 sections: (1) Framework Interface, composed of the Manager, Worker, and Node, performs the cluster setup, configuration, execution, and data aggregation. (2) Application Interface, made up of a CLI, plugin registry, REST API, and a Web app, provides the tooling and scaffolding for pipeline design, deployment, and orchestration._

Now it was time to put the system to the test. The initial trial occurred during the [GEM-STEP](https://embodiedplay.org/) retreat in the summer of 2023, where we collected audio and video data from six web cameras and microphones as graduate students engaged with the game. Subsequently, we used ChimeraPy to develop several [demos](https://github.com/ChimeraPy/Pipelines) for the EngageAI site visit and additional pipelines for [benchmarking](https://github.com/ChimeraPy/Benchmarks) as well. However, the first significant real-world application emerged when we had to develop a data collection pipeline for a classroom study conducted in October and November 2023 at [Norman Binkley Elementary School in Nashville](https://normanbinkley.mnps.org/).

## GEMSTEP Fall 2023
In the beginning of Fall 2023, we were tasked with developing a data collection pipeline for the [GEM-STEP](https://embodiedplay.org) study, which was to be conducted at Norman Binkley Elementary School in Nashville. The study was a collaboration between [Noel Enyedy](https://peabody.vanderbilt.edu/bio/?pid=noel-enyedy)'s group from the Peabody campus at Vanderbilt and [OELE](https://wp0.vanderbilt.edu/oele). Several PhD students from his group and from our lab, including [Joyce](https://scholar.google.com/citations?user=6QmCCGEAAAAJ), Eduardo, and myself, were responsible for the research and technical aspects of the study.

In the GEM-STEP project, students embody characters in a game and learn about various scientific processes and concepts. The game utilizes a Pozyx system to track students in the play area, and their positions are mapped to a screen. One module, for example, might focus on Photosynthesis, where students embody molecules and move around the play area to collect sunlight and water. The game is designed for group play, and students are expected to collaborate to achieve the learning objectives. During gameplay, the system generates game logs that would later be used in analysis.

The data collection was constrained by the fact that we had to take our systems to a Norman Binkley classroom, where space for device placement was limited, and we were truly constrained because we couldn't access the internet. Since this was the first test of our system in a real-world classroom setting, we didn't want to replace the traditional ways in which Noel's group collected data in the classroom. Therefore, we decided to supplement the traditional data collection methods with our system, which could collect audio, video, and other data in the classroom. 

![GSDCP](/images/DaysOfCollection/gsdcp.png)
*The eventual architecture of the GEM-STEP Classroom Study Data Collection Pipeline*

## The Shift to Livekit: A Rationale
I was relentlessly traveling to the school, fixing code, and taking hardware back and forth from ISIS to the school for hardware and software fixes. Then, after a month or so of helping out Joyce in the classroom study, I was kind of burnt out and hadn't had a proper vacation in 2 years. I spoke with Prof. Biswas, my supervisor, about taking a 45-day-long vacation. With his blessing, I booked my flights, packed my bags, and flew to Nepal in late November 2023.

At this point, we had multiple reasons for being unhappy with the state of things in ChimeraPy. Firstly, while we were happy with developing things and writing Python Nodes ([1](https://github.com/ChimeraPy/RerunNode), [2](https://github.com/ChimeraPy/WSSChimeraPyNode), [3](https://github.com/ChimeraPy/webrtc-chimerapy-node)), we still hadn't thought out and planned a proper architecture to get data from the browsers, which would be crucial for the learning environments we needed to integrate. Using [ZeroMQ](https://github.com/zeromq/jszmq) in browsers wasn't as straightforward as we had thought. Secondly, and perhaps more significantly, we found that most of our time was spent developing and testing the underlying networking infrastructure, and we were nowhere near feature-complete to begin integrating and advertising the multimodal pipeline with ChimeraPy in some of the external and internal learning environments. At OELE, we have to adhere to tighter deadlines, and we were already behind schedule. Additionally, the goal of this research software development endeavor was to develop multimodal data collection/analysis applications rather than developing a distributed streaming framework, which, to be honest, felt like reinventing the wheel a lot of the time. Thirdly, while ChimeraPy worked great for one-off classroom studies with a few streams, the real challenge for us was to scale it to a classroom study with hundreds of streams and deliver it from the cloud.

This was the point after the GEM-STEP study of fall 2023, and I was on vacation. This is when Eduardo and I decided to deliberate on possible steps ahead. We had a lot of discussions, and Eduardo was thinking about extending the ChimeraPy architecture, while I was looking for some open-source solutions that we could leverage.

Overall, we had come to the following takeaways from our discussions:

1. We need to focus on the **deliverables** rather than the underlying networking infrastructure.
2. **[WebRTC](https://webrtc.org/)** could be a viable solution for our browser integration needs.
3. Local infrastructure was not scalable for our needs, and we needed to move to the cloud.

A lot of our architectural deliberations are diagrammed in the following draw.io [diagram](https://drive.google.com/file/d/1ltU0fwN6BCdUUstrCeSjVE37Hbz18W_8/view?usp=sharing). Eduardo even wrote up an entire design [document](https://docs.google.com/document/d/1dpWwT8YPing48Q1gLqsosxMh0rToZgXDhzsGrkJaGmU/edit?usp=sharing) for ChimeraJS, which was a proposed extension to ChimeraPy to support browsers. I looked into a few media servers like [mediamtx](https://github.com/bluenviron/mediamtx), [ant media server](https://github.com/ant-media/Ant-Media-Server) etc., to see if we could leverage those servers and repurpose them for streaming as well as writing browser adapters, but none of them seemed to fit the use case we had in mind. We also looked into [PeerJS](https://github.com/peers/peerjs) and [PeerJS-Python](https://github.com/ambianic/peerjs-python), using which we could solve the browser integration problem. All three approaches had their pros and cons, enlisted below:

### Option 1: ChimeraJS + Integrations with ChimeraPy
The pros of this was that we didn't have to do a lot of pivoting to support this. We could leverage the existing architecture and use an [aiortc](https://github.com/aiortc/aiortc) adapter to support WebRTC. This would also let us have our own WebRTC-based tech stack and would fit a lot of our needs at a lower scale. The cons were that we would still have to develop and test the underlying networking infrastructure, which was a major bottleneck for us. Additionally, leveraging cloud infrastructure would be a challenge, and we would have to do a lot of work to make it work.

### Option 2: Media Servers
The pros of this approach would be that we would get a ready-to-use infrastructure to support streaming multimodal data, and we would be able to support a wide array of protocols like RTMP, SRT, and WebRTC. Specifically, we looked into [ANT Media Server](https://github.com/ant-media/Ant-Media-Server) and [MediaMTX](https://github.com/bluenviron/mediamtx). The cons were that we would have to write a lot of computation infrastructure code to support our use case, and we would have to do a lot of work to make it work.

### Option 3: PeerJS
The advantages of using PeerJS include the ability to enable peer-to-peer (P2P) communication utilizing WebRTC, with the support of a custom signaling server hosted in the cloud, which fits well within our existing Python-based infrastructure. This compatibility reduces the need for significant changes to our current system. However, PeerJS presents challenges in terms of scalability, as it is primarily designed for P2P interactions and may struggle under the load of larger, more complex deployments. Moreover, its reliance on P2P connections restricts it to scenarios that do not require centralized control or data aggregation. Additional considerations include the necessity of a robust cloud infrastructure to manage the signaling server effectively, which could increase complexity and costs.

Overall, none of these solutions we looked into really fit our use case, and then one fine morning, from a cafe in Bharatpur, Nepal, I sent out a Slack message to Eduardo about a new open-source project I had found, called [LiveKit](https://github.com/livekit), that touted itself as an open-source, scalable, and secure WebRTC infrastructure. This seemed promising to me in the beginning, however, I have to admit that I didn't know much about it when I sent it to Eduardo. Eduardo, to his credit, did the initial research about LiveKit and had come to the realization that this infrastructure was exactly what we needed. We were on the lookout for an infrastructure that:

1. Respects the Open Source Philosophy
2. Supports data collection from a wide range of devices/environments
3. Doesn't need a lot of reinventing of wheels to fit our use cases
4. Easy to use with browsers as well as local IoT devices
5. Has support for processing streams locally as well as in the cloud

Eventually, my vacation days were over, and I flew back to Nashville. At this point, we had decided that before pivoting to LiveKit, we should at least explore all the features in a way such that we could make an informed decision. I did a lot of reading, like this very informative blog [post](https://blog.livekit.io/scaling-webrtc-with-distributed-mesh/) and the entirety of the [LiveKit documentation](https://docs.livekit.io/) to actually understand the capabilities we would be getting with LiveKit. With this information, I also worked on a small [proof of concept](https://github.com/oele-isis-vanderbilt/livekit-quickstart) to see if we could leverage LiveKit to fit our use case.

In hindsight, the MMLA collection and analysis requirements are similar to those of video/audio conferencing applications, with an added level of complexity due to the need to support different hierarchies for group and individual audio, peripheral IoT devices, and other kinds of data discussed above. The one difference is that a video conferencing application has true peer-to-peer delivery from the get-go, whether using pure P2P protocols or an [SFU](https://trueconf.com/blog/wiki/sfu), while data collection in an MMLA setup requires centralized collection and processing with selective peer-to-peer delivery. However, this is beyond the point of analogy between video conferencing and MMLA collection. 

**First**, similar to video conferencing applications, both contexts involve multiple participants (humans as well as bots).  
**Second**, both require real-time data processing and delivery.  
**Third**, depending on the application requirements, the software facilitating both should be scalable and delivered from the cloud.  
**Fourth**, and probably the most similar aspect, is that both fundamentally include streaming audio, video, and data from multiple sources and processing them in real-time.  

Similar to a timed video call in conferencing, a classroom study in MMLA has a start and end time, and the data collected during this period is saved (similar to recording online meetings), and can be processed both in real time and post-hoc. On the other side, synchronization and data quality are likely more important in MMLA collection than in video conferencing, as the data collected in MMLA should be mapped to a unified timeline and be of high quality to be used for analysis. This was probably the biggest selling point for [LiveKit](https://docs.livekit.io), as it supported all these features out of the box, and we could leverage it to fit our use case.

Simply put, LiveKit is an open-source project that enables the creation of scalable, real-time video and audio applications. It essentially allows developers to build an open-source tool similar to Zoom or Google Meet. At its core, the LiveKit server functions as a Selective Forwarding Unit ([SFU](https://github.com/)) media server. This setup allows participants to join a LiveKit "Room" and send or receive audio to and from other peers in the room. It supports both streaming and video conferencing.

![LiveKit SFU](/images/DaysOfCollection/lk-sfu.png)
*A visual representation of LiveKit's SFU architecture*

One of the standout features of the LiveKit ecosystem is that it is completely open-source, and there is comprehensive [documentation](https://github.com/livekit/deploy) available on how to deploy it. LiveKit also offers a wide range of SDKs and APIs, allowing for the development of applications in languages and frameworks such as JavaScript, Python, Rust, Unity, and more. Essentially, it provides a one-stop solution for building video and audio applications.

In our specific context, the most significant advantage was LiveKit’s out-of-the-box support for video, audio, and screen, as well as data streaming from the browser, which had been a major bottleneck in our ChimeraPy project. Additionally, LiveKit's [Egress](https://docs.livekit.io/egress-ingress/) feature allows for saving the streams to cloud storage, with synchronization achieved via seconds from the Unix epoch as timestamps for audio and video data. Furthermore, the [Agents](https://docs.livekit.io/agents/) framework in LiveKit offers a streamlined solution for processing and providing feedback on participants' streams. All of these features made it clear that pivoting to LiveKit was the right move for us, and we were ready to make the switch.

## Deep Dive into LiveKit Integration: LivekitMMLA

## IACT Study: Spring 2024

## Practical Outcomes and Experiences

## Lessons Learned and Best Practices

## The Road Ahead

## Conclusion

## Call To Action

## Special Mention to Eduardo

## Thanks NSF