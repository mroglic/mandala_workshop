
# Overview

- Intro to robot arms throught collaborative drawing.
- A brief overview of robotic arms and their use in industry and creative practices.
- We learn tech skills along the way: basics of robotic manipulation, kinematics, commands, possible problems (singularities), gcode, p5js, websockets.
 
![[Pasted image 20240820101302.jpg|600]]

# Questions we are asking

- How can we ***balance creative agency*** between humans and machines?
- How can we cultivate a more ***meaningful relationship with machines*** in the creative process, rather than merely using them as executors of commands?
- In what ways does the integration of digital tools and robotic technology ***expand or limit artistic expression*** and creativity?

# Motivation

- I have noticed a ***lack of accessible tools for using robotic arms in art***, and I aim to bridge this gap. Many existing robotic frameworks require deep technical knowledge, making them intimidating for artists. 
- My ***goal is to create open-source tools that enable artists to intuitively use robotic arms***

- ***"We shape our tools, and thereafter our tools shape us"***
	- by Marshall McLuhan (on Ontological Design)
- ***"Minds like ours are meant for merging with tools"***
		- by Andy Clark (book "Natural-Born Cyborgs")
 
# Why Mandala?

- Used for centuries as ***tools for collective meditation*** and are seen as reflections of the universe and ourselves within it
- Symbolizin interconnectedness and the transient nature of existence
- Symetrical, geometric structure which are ***useful to express both both collective and individual creativity***
- Each participant designs one symbol, which is then being projected around unique circle

# Where are Robot Arms used today?

## Industrial Robot Arms

Industrial robots are generally large, powerful machines designed for high-speed, high-precision tasks. They are usually found in environments that require repetitive and heavy-duty operations, often operating in isolated areas away from human workers due to safety concerns. Key industries and applications include:

![[pic.webp|left|400]]

1. **Automotive Manufacturing:**    
    - **Welding:** Robots are extensively used for spot welding and arc welding in automotive assembly lines.
    - **Painting:** They ensure consistent, high-quality finishes on vehicle bodies.
    - **Material Handling:** Robots are used for moving heavy parts, such as engines and body panels, within the production line.
2. **Electronics Manufacturing:**    
    - **Assembly:** Robots handle the precise placement of components on circuit boards.
    - **Testing and Inspection:** Automated testing of electronic components to ensure quality control.
    - **Packaging:** Robots package finished products, ensuring they are ready for shipping.
3. **Metalworking and Fabrication:**    
    - **Machining:** Robots are used in CNC machining for drilling, milling, and cutting.
    - **Forging and Casting:** They handle molten metals and operate in environments hazardous to humans.
    - **Sheet Metal Bending:** Robots manage the bending and shaping of metal sheets.
4. **Food and Beverage Industry:**    
    - **Packaging:** Automated packaging of food products in boxes, cans, or bottles.
    - **Palletizing:** Robots stack products onto pallets for shipping.
    - **Meat Processing:** Robots handle tasks like cutting, deboning, and sorting.
5. **Pharmaceutical Industry:**    
    - **Dispensing:** Robots manage the precise filling of bottles and packaging of medications.
    - **Sterilization:** Automated systems for sterilizing instruments and equipment.
    - **Handling Hazardous Materials:** Robots manage dangerous or sterile materials where human interaction is minimized.

## Collaborative Robot Arms (Cobots)

Cobots are designed to ***work alongside human workers in a shared workspace***, enhancing productivity without compromising safety. They are generally smaller, more flexible, and easier to program than traditional industrial robots.

![[Pasted image 20240820105311.jpg|400]]

Common applications and industries include:

1. **Small to Medium-Sized Enterprises (SMEs):**    
    - **Assembly:** Cobots assist with light assembly tasks, such as screwing, inserting parts, and testing products.
    - **Quality Control:** They can perform repetitive inspection tasks, ensuring consistency and freeing up human workers for more complex duties.
2. **Medical and Healthcare:**    
    - **Surgery Assistance:** Cobots assist surgeons in performing minimally invasive procedures with high precision.
    - **Rehabilitation:** Cobots help in physical therapy, providing controlled resistance or assistance to patients.
    - **Laboratory Automation:** Handling of samples, sorting, and analysis in clinical laboratories.
3. **Electronics:**    
    - **Assembly of Small Components:** Cobots handle delicate tasks such as placing micro-components on boards or soldering.
    - **Testing:** Automated testing of small electronics, such as smartphones and wearable devices.
4. **Logistics and Warehousing:**    
    - **Pick-and-Place Operations:** Cobots assist in order fulfillment by picking items from shelves and placing them in boxes for shipping.
    - **Packaging:** Cobots can work alongside humans to package products, reducing strain and increasing efficiency.
5. **Retail:**    
    - **Customer Assistance:** Cobots can be used in stores for tasks such as greeting customers, providing product information, and even helping with stocking shelves.
    - **Inventory Management:** Automated stock-taking and replenishment using cobots to reduce human workload.
6. **Research and Development:**    
    - **Prototyping:** Cobots are used in R&D labs to assist in the assembly and testing of prototypes.
    - **Material Handling:** In research settings, cobots help manage hazardous or sensitive materials safely.

# Robots and Drawing

## AARON

- by **Harold Cohen** (Pioneer of Computer-Generated Art)
- Computer program designed to produce paintings and drawings autonomously
- Harold ***considered his work with AARON always as collaboration between himself and the software***

![[Pasted image 20240820115449.jpg|left|500]]

![[RS78111_Harold_Cohen_AARON_for_KCat_2001_-_9.webp|left|500]]

![[20160509cohen-obit-slide-3VIK-articleLarge.webp|left|500]]

![[Pasted image 20240820115827.jpg|left|500]]

## e-David

- by **University of Konstanz, Germany**
- Objective of the project is to develop a painting ***machine that can replicate human artistic processes*** and to provide a framework for automatic painting
- ***Process:*** First, an image is decomposed into shapes using a custom image abstraction procedure. This relies on an AI model to ***provide us with semantic information***, allowing the robot to cleanly separate objects. Given these shapes, our software generates an overall paint plan to realize all shapes and classifies them as regions, single strokes or details. For each of these a style is chosen in which it should be realized, based on image smeantics and geometry. Then, each detected feature is painted onto the canvas using visual feedback, i.e. a ***camera supervises the canvas and detects errors which are iteratively corrected***.
- Uses feedback loop from camera
	- Paints a set of computer generated strokes. 
	- Checks to see if the painted strokes accurately represent the input image
	- Generates the next set of strokes to more accurately match the input image
	- This process mimics the human painting process, just as a painter would lighten and darken a painting to satisfaction rather than paint a perfect painting in one attempt. This also allows the robot to autonomously correct mistakes caused by dripping paint, deformed brushes etc., as such a defect is spotted when comparing the input image with the current canvas state.
	
<iframe width="650" height="360" src="https://www.youtube.com/embed/DS_E34m9lI8" title="e-David Robot Painting" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## drozBot

- by **Idiap Research Institute** (Switzerland)
- Draw portraits iterativelly - https://calinon.ch/drozbot.htm
- A **fluid movement mimicking the gestures of an artist**.
- Matematicaly speaking it ***ensures the system's behavior satisfies certain statistical properties over time.***
- Explore the frontiers between optimality and randomness.
- Appearing chaos of the first strokes disappear with the ensemble view of the final portrait.

<iframe width="640" height="360" src="https://www.youtube.com/embed/K-WPry8ltXU" title="drozBot: Using Ergodic Control to Draw Portraits" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> 

![[Pasted image 20240820121020.jpg|left|640]]

## CloudPainter

- by **Pindar Van Arman**
- Builds his own robots and developed 
- Uses camera feedback loop
- ***Process***: take photo, do styletransfer, do k-means clustering (for 8 colors), then queries Elastic search for brushstokes based on previos paintings, after robot is done he actually paint over.

<iframe width="640" height="360" src="https://www.youtube.com/embed/dkTjEi7O4Ic" title="Pindar Van Arman Is Teaching Robot Artists To Paint Like Humans (HBO)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

# Performative Drawing

## Patrick Tresset

- Artist and Computer Scientist
- His inspiring story - https://www.youtube.com/watch?v=4u0D57kqA1A
- Lost interest in painting due to side effect of medications for Bipolar Disorder (which he cured)
- ***Paul robot pretends to do a lot of things***, like when he looks at you, he is just pretending that he is scanning your face (he is doing nothing, it's part of performance (this was also my idea to embed in robotic behaviour))
- ***he thinks that robots of the future will be better socially adapted and integrated if they have artistic skills***
- by DW - https://www.youtube.com/watch?v=A4dQIuD6xbA&list=PLLA-1Tl6YKkY5V6d3VdKWPVP5yKNZ-qcE
	
 <iframe width="640" height="360" src="https://www.youtube.com/embed/EH0WFkcZNDg" title="&quot;5 Robots Named Paul&quot; drawing Nino." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The 15-minute performance is less a commentary on technology itself than an observation on society, human nature, and behavioral standardization.

Nine robots act as stylized pupils in the “classroom.” They learn to pass the time and ***obey the teacher during the lesson*** represented in theatrical performance. Even after revolting, they get back in line to follow what is being taught. Childhood memories, Jacques Tati, Theodor W. Adorno and Michel Foucault influenced Patrick Tresset for this art installation.

 <iframe width="640" height="360" src="https://www.youtube.com/embed/znI6reVdN_M" title="Human study #4, La Classe" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

https://www.youtube.com/@PatrickTresset/videos
https://patricktresset.com/new/ 

Tresset presents theatrical installations in which ***robotic agents are actors,*** these installations are often evocations of humanness. Tresset crafts the computational systems driving the robots so that their behaviour can be perceived as artistic and expressive. These systems are influenced by ***research into human behaviour***, more specifically ***how human artists depict other humans, how humans perceive artworks and how humans relate to robots***. Tresset also uses robots and autonomous computational systems to produce series of drawings and paintings of classical subjects such as portraits, nudes and still lifes. 

## Sougwen Chung

- Nice interview - 'Sougwen Chung on Us in Another Form' - https://www.lerandom.art/editorial/sougwen-chung-on-us-in-another-form?ref=gorillasun.de
- "I’m exploring a mode of working with human-machine interconnections beyond mere extension to more of a feedback loop, a call and response that is made visible. I want to think about ways we embody systems and vice versa."
- "It’s a ***process that foregrounds uncertainty*** at its very core and maybe a sense of playfulness too."
- "In each work of generative art nests a question – what is the role of the human hand? In my work, I wonder – how do we steward its evolution?"
- "Perhaps it can be seen as a practice interested in adaptation – to living with and creating with machines."
- "It is art practice that shapes the technology that shapes us."

 ![[imrs.webp|left|640]]

<iframe width="640" height="360" src="https://www.youtube.com/embed/hpEE_s0pN64" title="Human-machine art collaboration" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

![[Pasted image 20240820123244.jpg|left|640]]

# And others...

## Jaquet-Droz automata

- Considered as the first reoprogrammable robots
- from 18th century

![[Pasted image 20240820135611.jpg|LEFT|300]]

![[Pasted image 20240820135628.jpg|left|300]]

## Stelarc

- focus heavily on ***extending the capabilities of the human body***

## Nicholas Negroponte

- Architecture Machine and SEEK
- Negroponte ***envisioned computers as interactive partners in the design process rather than mere tools for computation***. The "Architecture Machine" was conceptualized as a system that could actively engage with the designer, offering suggestions, responding to input, and even learning from the designer's preferences. This interaction would create a dynamic dialogue between the architect and the machine, facilitating more innovative and responsive design processes.

## Ken Goldberg

- Telegarden (1995)

## Dragan Ilic

	![[Pasted image 20240820124504.jpg|left|600]]

## Mimic (2017)

- by Design I/O
- https://www.design-io.com/projects/mimic

<iframe src="https://player.vimeo.com/video/207140893?h=5089b4576d&color=8bcfb1&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

## Compared to Pen Plotters

- CASA theories (Computers are social actors)]]
	- Similarity Attraction Theory: ***People are more likely to respond positively to computers that exhibit characteristics similar to their own, such as language style, personality traits, or interests.***
  
# Intro to Robotic Arms

Belgrade Hand (1960) - MIT’s Tentacle Arm and my alma mater faculty’s Belgrade Hand @ MIT Museum, Boston

![[PXL_20230515_201901824.jpg|left|600]]

## Cultural Differences

- The fascination with robots varies greatly depending on the society, the culture and its history. 
- In the ***West***, when we hear the word "robot", we still think of a ***mechanical terminator that cannot be trusted***
- in ***Japan***, robots are superheroes and ***human friends***. The Japanese are so fascinated by robots that they often refer to their country as the "robot kingdom"

# Our Robot

## Specs

- Tech Name: UFactory Lite 6
- https://www.ufactory.cc/lite-6-collaborative-robot/
- speed: 500 mm/s
- Reach: 440 mm
- Repeatability: 0.5 mm
- Payload: 600g
- Weight: 7.2 kg
- Motor Type: DC Brushless
- Robot communication: Private TCP, python
## Joint Ranges

- 1st Axis ±360° (znaci da moze da uradi 2 cela kruga, nije endless (nema slip rings))
- 2st Axis ±150°
- 3st Axis -3.5°～300°
- 4st Axis ±360°
- 5st Axis ±124°
- 6st Axis ±360° (znaci da moze da uradi 2 cela kruga, nije endless (slip rings))


![[Pasted image 20240204203102.png]]
![[Pasted image 20240204203107.png]]




## Links and Joints

![[link-and-joint.webp|left|500]]

## Serial and Parallel types

Robots are roughly categorized into two types according to how their links are arranged: 
- Serial link
- Parallel link

![[serial-and-parallel-link.webp|lleft|500]]

The human arm is categorized as a serial link since its joints—the shoulder, arm and wrist—are aligned in series.

## Comparison of movement between robot and human 


<iframe width="640" height="480" src="https://www.youtube.com/embed/Gu74rGY426g" title="Comparison of movement between robot and human" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

![[humans-and-robots.webp||left|640]]

## Glossary

**Tool Flange**
- This is the part of a robot arm where tools or attachments are connected. Think of it as the "wrist" of the robot where you can attach different "hands" or tools for different tasks.

**End Effector**
- The end effector is the tool or device attached to the robot's tool flange. It's what the robot uses to interact with the world. For example, it could be a gripper to pick things up, a welder for welding, or a paint sprayer for painting.

**TCP (Tool Center Point)**
- The TCP is the specific point on the end effector that is used as the reference point for the robot's movements. It’s like the tip of the tool. When programming the robot, you use the TCP to define exactly where you want the robot to go and perform its tasks.
 
**Forward Kinematics (FK)**
- ***Calculation of the position and orientation of the end effector*** (e.g., a robotic arm's hand or tool) based on given joint angles.
- It's like figuring out where the tip of a robot arm will be if you know how much each joint is bent or rotated.

**Inverse Kinematics (IK)**
- the opposite process, where you ***calculate the necessary joint angles or positions to achieve a desired position and orientation*** of the end effector.
- It's like figuring out how to bend or rotate each joint of a robot arm to place the tip exactly where you want it.

![[Pasted image 20240818160156.jpg|left|600]]


**DoF (degrees of freedom)**
- number of independently controllable joints robot has
- most industrial robots have 6
 
## Movement types

![[Pasted image 20240818154252.png|left|600]]

- **Joint Move**
	- the shortest path in the robot's coordinate system. Shortest means the robot **moves only necessary joints**. It looks like an ellipse in Cartesian coordinate system (XYZ), though in reality it is more like a spline.
	- ***The problem with a joint motion is that you don’t know the trajectory of the robot before it moves.*** But for a robot it is easier use joint motion because there are no singularities since robot does interpolation between two positions instead of finding a solution of the inverse kinematic problem.
- **Linear Move**
	- a standard line in a Cartesian coordinate system.
- **Constant speed motion**
- **Circular Motion (arc)**
# Singularities

## Definitions

- ***When a 6 DoF robot enters a singularity, one or more of its joints will effectively become useless, turning it into a 4 or 5 DoF robot.***
- A singularity is a ***particular point*** in a robot’s workspace that causes the robot to lose one or more degrees of freedom (DoF). When a robot’s tool center point (TCP) moves into or near a singularity, ***the robot will stop moving or move in an unexpected manner***.
- **Mathematical**: When the determinant of the Jacobian is zero, the robot has a singularity.
- This is a point in space with an infinite number of solutions for an inverse kinematic problem and the robot cannot choose the right solution.
- Explanation: the robot moves from one point to another. Since its motion is linear (that means that we set coordinates of the flange instead of the joints), the robot solves an inverse kinematic problem in each intermediate point. In one of those points the robot faces an infinite number of solutions with lots of possible wrist orientations. As a result, in this point the robot tries to pass instantly from the position with "wrist on top" to the position with "wrist below" and stops in a Protective Stop.
- Why this is important: ***It results in high mechanical (gearbox, motors) and electric (controllers) stress when the robot passes through such point. And this stress in turn significantly reduce the robot's service life.***
## How to spot

- Here are a few markers that suggest your robot might have entered or passed near a singularity:	
	- ***It makes a jerky movement*** or stops suddenly.	
	- Its tool center point (TCP) slows down or stops. At the same time, some of its joints simultaneously accelerate to their maximum speed.	
	- It appears to get stuck when moving through empty space.
	- If any of these happen, it’s worth investigating if the robot has moved through a singularity.
## 3 Basic Types of Singularity (wrist, elbow, and shoulder)

#### Wrist Singularities

A wrist singularity occurs when the axes of the robot’s ***Joint 4 and Joint 6*** become either “coincident” or parallel, depending on the robot. [Coincident lines](https://socratic.org/questions/what-are-coincident-lines) are those that are both parallel with each other _and_ they share a point… which basically means that two separate lines become the same line.

![[Wrist-Singularity.gif|left|600]]

#### Elbow Singularities

You can usually recognize an elbow singularity because it looks like the robot has “stretched too far.” In many robots, it occurs when the elbow joint (Joint 3) is at 0°, though this depends on how the home position of the robot is defined.

![[Elbow-Singularity.gif|left|600]]

#### Shoulder Singularities

The third type you might encounter is the shoulder singularity. This occurs when the center of the robot’s wrist aligns with the axis of Joint 1, or when the axis of Joint 6 becomes coincident with the axis of Joint 1.

![[Shoulder-Singularity.gif|left|600]]

## Jacobian

- It can be used to convert between the angular velocities of the robot’s joints and the velocity of the robot’s end effector.
- It can be used to [convert polar or spherical coordinates](https://en.wikipedia.org/wiki/Jacobian_matrix_and_determinant) into Cartesian coordinates.
- It can be used to determine if the robot has singularities and where those singularities are in the robot’s workspace.
- When the determinant of the Jacobian is zero, the robot has a singularity. What does the determinant of a matrix show us? For one thing, it helps to calculate the inverse of the matrix. This is important because we need the “inverse Jacobian” to convert a desired end effector velocity into a set of joint velocities. What does it mean when the determinant is zero? It shows us that there is no solution to the linear equations that are represented by the matrix. This means that a Jacobian with a determinant of zero has no solutions.
## Commands

- All commands are described either by point coordinates in a three-dimensional space (X, Y, Z, RX, RY, RZ), or by angles of robot joints in the robot’s space (j1, j2, j3, j4, j5, j6).

**Constraints in joints rotation.** Robot's joints cannot rotate infinitely due to mechanical constraints (for example, because of the wires). This is particularly true for cobots because they are taught in Free Drive mode. As a result the robot gets into Protective Stops because of a joint limit violation.

# GCode

- Designed by	Massachusetts Institute of Technology (MIT)
- reference - https://linuxcnc.org/docs/html/gcode/g-code.html#gcode:g1

## Basic GCode commands

```gcode
G90 ; absolute mode
G91 ; relative (invremental) mode
G21 ; set units to mm
G0  ; pen up, pen down, pen move above paper (Coordinated Motion at Rapid Rate)
G1  ; draw line (Coordinated Motion at Feed Rate)
G0 F1500 ; set speed
G17  ; XY plane
G4 P0.2 ; pause for 0.2 seconds
```

## G0 Example
```gcode
G90 ;set absolute distance mode
G0 X1 Y-2.3 ;rapid linear move from current location to X1 Y-2.3
```
## G1 Exapmle
```gcode
G91 ;set incremental distance mode
G0 X2.5 ;rapid move 2.5 from current position along the X axis
```

## Two libraries (WIP)

- p5 library for collaborative Drawing (using p5 and websockets)
- p5 library for intuitive robotic manipulation

# p5 library for collaborative drawing

- wrapper around p5 commands -> websockets -> shared canvas
- `CD.line (0, 0, 100, 100)
- sends this command over websocket to main server
- main servers send this command to shared canvas
- sketch for shared canvas (receiver.js)
	- reads comands
	- parse them
	- execute corresponding p5 commands to particular place on the circle (which is predefined for each participant)
- in this example it will execute `p5.line(0, 0, 100, 100)`

# p5 library for robotic commands

- wrapper around p5 commands -> GCode
- `GW.line (0, 0, 100, 100) // startX = 0, startY = 0, endX = 100, endY = 100`
	translates to:
	`G1 X0 Y0 ;line start
	`G1 X100 Y100 ;line end`
- and calls p5 line to be shown on canvas

# Instructions

- Download GitHub Desktop - https://desktop.github.com/download/
- Download VS Code - https://code.visualstudio.com/
- Install Live Server Extension (used for automatic refresh of webpage, results can be seen immediatelly)
- Clone repository - https://github.com/mroglic/mandala_workshop
- Our work will be in ***workshop*** folder
- Create folder with your name inside workshop folder
- Copy "sender.html" and "sender.js" from any folder inside ***templates*** 
- Our drawing code will be only inside ***drawSymbol()***
- At the end of ***drawSymbol()*** call ***CD.sendAllCommands();***
- Once we are satisfied with mandala, we generate gcode from our drawing and send it to robot for execution

## Use these functions

```js

// choose color
let line_color = [233, 29, 98];

// line
CD.line(startX, startY, endX, endY);

// circle
CD.circle(centerX, centerY, diameter);

// rectangle
CD.rect(rectX, rectY, width, height);
CD.sg.rectMode(CORNER);
CD.sg.rectMode(CENTER);

```



 