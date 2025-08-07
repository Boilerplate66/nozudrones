// src/utils/sanityClient.js
// This file simulates fetching data from Sanity.io.
// In a real application, you would use '@sanity/client' to connect to your Sanity project.

// Mock FAQ data parsed from the CSV-like input
const mockFaqData = [
  {
    category: "UK Drone Law & Regulation",
    question: "Do I need a license to fly a sub 250g drone in the UK?",
    shortAnswer: "No, but you do need an Operator ID.",
    detailedAnswer: "Anyone flying a consumer drone for recreational purposes in the UK does not actually need a specific 'license' but must adhere to the Air Navigation Order. However, registration is mandatory for drones weighing between 250 grams and 20 kg (Operator ID) and anyone who flies it needs a Flyer ID, obtained by passing a free online test provided by the CAA. Commercial flyers require an Operational Authorisation.",
    keywords: ["license", "UK", "drone law", "Flyer ID", "Operator ID", "CAA", "registration"],
    publishedAt: "2025-06-16T15:00:00Z", // Converted from 45824.625
  },
  {
    category: "UK Drone Law & Regulation",
    question: "Do I need to register my drone if it's under 250g?",
    shortAnswer: "Yes, if your drone under 250g has a camera, you need an Operator ID (unless it's a toy).",
    detailedAnswer: "Even if your drone weighs less than 250g, if it is equipped with a camera, you are generally required to register for an Operator ID. This allows authorities to identify the owner in case of an incident. There is an exception if the drone is classified purely as a 'toy' and has no camera or recording capability.",
    keywords: ["registration", "250g", "camera", "Operator ID", "UK law"],
    publishedAt: "2025-06-16T15:09:59Z", // Converted from 45824.63194
  },
  {
    category: "UK Drone Law & Regulation",
    question: "What are the consequences of flying a drone illegally in the UK?",
    shortAnswer: "Penalties range from substantial fines for minor infractions to criminal prosecution and imprisonment for serious offenses.",
    detailedAnswer: "Breaching UK drone regulations can lead to severe consequences. Minor infractions, such as flying above height limits or without proper registration, can result in fines up to £1,000. More serious offenses, like reckless endangerment, flying in restricted airspace (e.g., near airports), or using a drone for criminal purposes, can lead to criminal prosecution, substantial fines, and potential prison sentences of up to five years.",
    keywords: ["penalties", "fines", "imprisonment", "illegal flight", "UK law"],
    publishedAt: "2025-06-16T16:55:00Z", // Converted from 45824.70486
  },
  {
    category: "UK Drone Law & Regulation",
    question: "Do I need insurance to fly a drone in the UK?",
    shortAnswer: "Insurance is legally required for commercial drone use or drones over 20kg; recommended for all flights.",
    detailedAnswer: "While not always legally mandatory for recreational flights with lighter drones, public liability insurance is highly recommended for all drone pilots to cover potential damages or injuries. It is legally required if you are flying a drone for commercial purposes or if your drone weighs over 20kg.",
    keywords: ["insurance", "commercial", "liability", "UK law"],
    publishedAt: "2025-06-16T15:39:59Z", // Converted from 45824.65278
  },
  {
    category: "Flight Operations & Safety",
    question: "What does 'Visual Line of Sight' (VLOS) mean for drone pilots?",
    shortAnswer: "VLOS means the pilot must always be able to see their drone clearly without aids and maintain full situational awareness.",
    detailedAnswer: "Visual Line of Sight (VLOS) is a fundamental safety rule in drone operation. It means the remote pilot must be able to see their drone clearly with their own eyes (without binoculars, telephoto lenses, or electronic viewing equipment like FPV goggles, unless an observer is present). The pilot must have a full view of the surrounding airspace at all times to avoid collisions and monitor for hazards. In the UK, VLOS is typically limited to a maximum horizontal distance of 500 meters.",
    keywords: ["VLOS", "visual line of sight", "safety", "flight rules", "CAA"],
    publishedAt: "2025-06-16T17:00:00Z", // Converted from 45824.70833
  },
  {
    category: "UK Drone Law & Regulation",
    question: "What are the privacy considerations when flying a drone with a camera?",
    shortAnswer: "Always respect others' privacy, avoid spying, and comply with GDPR if recording identifiable individuals.",
    detailedAnswer: "When flying a drone with a camera, you must always respect people's privacy. Avoid flying low over private property, recording identifiable individuals without consent, or causing a nuisance. If your drone captures images or video that could identify individuals, you must comply with data protection laws like GDPR, ensuring data is collected, stored, and used responsibly.",
    keywords: ["privacy", "GDPR", "data protection", "surveillance", "ethics"],
    publishedAt: "2025-06-16T16:35:00Z", // Converted from 45824.69097
  },
  {
    category: "Commercial Drone Use",
    question: "Can I use my drone for commercial purposes in the UK?",
    shortAnswer: "Yes, but commercial drone use typically requires an Operational Authorisation from the CAA and specific insurance.",
    detailedAnswer: "To use your drone for commercial purposes (i.e., for payment or in connection with a business), you generally need an Operational Authorisation from the Civil Aviation Authority (CAA). This involves demonstrating competence, undergoing specific training (like the A2 CofC or GVC), and having appropriate drone insurance. Commercial use falls under stricter regulations than recreational flying.",
    keywords: ["commercial use", "CAA", "Operational Authorisation", "insurance", "business"],
    publishedAt: "2025-06-16T16:40:00Z", // Converted from 45824.69444
  },
  {
    category: "UK Drone Law & Regulation",
    question: "What is considered 'commercial' drone use in the UK?",
    shortAnswer: "Any drone operation for remuneration or valuable consideration, requiring specific CAA permissions.",
    detailedAnswer: "In the UK, 'commercial' drone use refers to any flight activity conducted in return for payment or other valuable consideration. This includes aerial photography, surveying, inspections, deliveries, or any professional service. Commercial operators are subject to stricter regulations, including the need for specific CAA permissions (like an Operational Authorisation), public liability insurance, and passing a theory test and practical flight assessment.",
    keywords: ["commercial use", "CAA", "UK law", "Operational Authorisation", "business"],
    publishedAt: "2025-06-16T16:40:00Z", // Converted from 45824.69444
  },
  {
    category: "UK Drone Law & Regulation",
    question: "What is a Flyer ID and an Operator ID in the UK?",
    shortAnswer: "A Flyer ID is for pilots (passing a test), an Operator ID is for the drone owner/manager (registration).",
    detailedAnswer: "In the UK, two IDs are crucial for drone users. A 'Flyer ID' is obtained by passing a free online theory test, proving basic knowledge of drone safety and rules; this is for anyone who flies a drone over 250g. An 'Operator ID' is a registration number for the person or organisation responsible for the drone, required for drones over 250g or any drone with a camera (unless it's a toy). The Operator ID must be displayed on the drone and renewed annually.",
    keywords: ["Flyer ID", "Operator ID", "UK law", "registration", "CAA", "drone IDs"],
    publishedAt: "2025-06-16T17:15:00Z", // Converted from 45824.71875
  },
  {
    category: "UK Drone Law & Regulation",
    question: "Can I use my recreational drone for commercial work without additional qualifications?",
    shortAnswer: "No, any drone use for 'remuneration or valuable consideration' is commercial and requires specific CAA permissions.",
    detailedAnswer: "Even if you own a recreational drone, if you use it for any purpose that results in payment or 'valuable consideration' (e.g., taking photos for a real estate agent, inspecting a roof for a fee, delivering a package), it immediately becomes a commercial operation in the eyes of the CAA. This necessitates obtaining specific qualifications (like a Flyer ID and Operator ID, and often a General VLOS Certificate (GVC) or Operational Authorisation), public liability insurance, and adhering to stricter operational rules than purely recreational flight.",
    keywords: ["commercial use", "recreational", "UK law", "CAA", "qualifications", "permissions"],
    publishedAt: "2025-06-16T18:40:00Z",
  },
  {
    category: "Flight Operations & Safety",
    question: "Can I fly my drone over buildings or busy areas in UK cities?",
    shortAnswer: "Generally restricted, requires adherence to distance rules (50m/150m) or specific permissions for congested areas.",
    detailedAnswer: "Flying drones in congested areas like cities, or over buildings, is heavily restricted in the UK. You must maintain a minimum horizontal distance of 50 meters from people and property not under your control, and at least 150 meters from built-up areas and large gatherings of people. Flying over crowds is strictly forbidden. For operations within these restricted zones or over congested areas, a specific Operational Authorisation from the CAA is usually required, often involving higher qualifications like an A2 CofC or GVC.",
    keywords: ["cities", "congested areas", "buildings", "no-fly zones", "UK law", "restrictions"],
    publishedAt: "2025-06-16T16:25:00Z",
  },
  {
    category: "Privacy & Ethics",
    question: "What are the data protection (GDPR) implications when using a drone with a camera?",
    shortAnswer: "If your drone captures identifiable individuals, it's personal data under GDPR; requires consent, security, and responsible handling.",
    detailedAnswer: "If your camera drone captures images or videos where individuals can be identified (even incidentally, e.g., faces, car number plates), that footage is considered 'personal data' under UK GDPR and the Data Protection Act 2018. This means you become a 'data controller' and must comply with GDPR principles. Key obligations include: being transparent with individuals where possible, obtaining consent (especially for private property), ensuring data is stored securely, not retaining data longer than necessary, and using the footage responsibly (e.g., not for harassment).",
    keywords: ["GDPR", "data protection", "privacy", "camera", "personal data", "consent"],
    publishedAt: "2025-06-16T17:05:00Z",
  },
  {
    category: "Flight Operations & Safety",
    question: "Do I need specific drone 'training' before buying one?",
    shortAnswer: "While not legally required for basic recreational drones, training is highly recommended for safety and skill development.",
    detailedAnswer: "While you don't need formal training or a 'license' to buy and fly a basic recreational drone in the UK (especially those under 250g without a camera), it is **highly recommended** for anyone serious about flying safely and skillfully. Training can help you understand the controls, airspace regulations, battery management, and emergency procedures. For drones over 250g or with cameras, you will need to pass the online Flyer ID test. For commercial use or more complex operations (like A2 CofC or GVC), specific training courses are mandatory.",
    keywords: ["training", "beginner", "learning", "safety", "qualifications", "buying guide"],
    publishedAt: "2025-06-16T20:45:00Z", // Converted from 45824.86458
  },
  {
    category: "Buying Advice",
    question: "What features should I look for when buying my first drone?",
    shortAnswer: "Key features include flight time, camera quality, obstacle avoidance, GPS, and availability of spare parts.",
    detailedAnswer: "When choosing a drone, consider battery life (flight time), camera resolution (4K is common), camera stabilization (gimbal), and obstacle avoidance sensors for safety. GPS is crucial for stable flight and features like 'Return-to-Home'. For beginners, durability and easily available spare parts are also important considerations.",
    keywords: ["buying guide", "features", "battery", "camera", "GPS", "obstacle avoidance"],
    publishedAt: "2025-06-16T15:25:00Z", // Converted from 45824.64236
  },
  {
    category: "Buying Advice",
    question: "How long does a typical drone battery last?",
    shortAnswer: "Flight times vary, but most consumer drones offer 20-30 minutes, with advanced models extending to 40+ minutes.",
    detailedAnswer: "Battery life is a primary factor in drone selection. Beginner drones might offer 5-10 minutes, mid-range typically 20-30 minutes, and more advanced professional drones can achieve 30-45 minutes or more. Factors like wind, payload, and flight style significantly impact actual flight time. Having spare batteries is highly recommended.",
    keywords: ["battery life", "flight time", "drone performance"],
    publishedAt: "2025-06-16T15:45:00Z", // Converted from 45824.65625
  },
  {
    category: "General Drone Info",
    question: "What is FPV (First Person View) in drones?",
    shortAnswer: "FPV allows you to see what the drone sees in real-time, often used for immersive flying or precise cinematography.",
    detailedAnswer: "FPV stands for First Person View, which means you receive a live video feed from the drone's camera to a screen (on the controller or a smartphone/tablet) or FPV goggles. This provides an immersive experience and is essential for precise flying, racing, or aerial videography, allowing the pilot to maneuver the drone as if they were onboard.",
    keywords: ["FPV", "first person view", "drone features", "flying techniques"],
    publishedAt: "2025-06-16T15:50:00Z", // Converted from 45824.65972
  },
  {
    category: "Flight Operations & Safety",
    question: "What is 'Return-to-Home' (RTH) on a drone?",
    shortAnswer: "RTH is a safety feature that automatically brings your drone back to its take-off point, often triggered by low battery or signal loss.",
    detailedAnswer: "Return-to-Home (RTH) is a crucial safety feature on many drones. When activated, either manually by the pilot, or automatically due to low battery, signal loss, or exceeding range limits, the drone uses GPS to fly back to its recorded take-off location. Ensure your RTH altitude is set above surrounding obstacles to prevent collisions during its return journey.",
    keywords: ["RTH", "safety feature", "GPS", "battery", "signal", "drone features"],
    publishedAt: "2025-06-16T16:45:00Z", // Converted from 45824.69792
  },
  {
    category: "Flight Operations & Safety",
    question: "What is 'Return-to-Home' (RTH) feature on a drone?",
    shortAnswer: "RTH is a safety feature that automatically guides the drone back to its takeoff point if signal is lost or battery is low.",
    detailedAnswer: "Return-to-Home (RTH) is a crucial safety feature on most GPS-enabled drones. When activated (either manually by the pilot, or automatically if the control signal is lost or the battery level becomes critically low), the drone will automatically navigate back to its recorded takeoff point (Home Point) and land. Pilots can usually set a minimum RTH altitude to ensure the drone clears obstacles on its return path. It's a key feature for preventing drone loss.",
    keywords: ["Return-to-Home", "RTH", "safety", "GPS", "features", "lost drone"],
    publishedAt: "2025-06-16T17:25:00Z",
  },
  {
    category: "General Drone Info",
    question: "Are drones hard to fly for beginners?",
    shortAnswer: "Modern drones with GPS and assisted features are much easier to fly, making them accessible to beginners.",
    detailedAnswer: "With advancements like GPS position hold, automatic hover, and beginner modes, modern consumer drones have become significantly easier to fly. Many ready-to-fly (RTF) models are designed for ease of use. A learning curve of around two weeks can make a beginner feel confident. Always start practicing in large, open fields away from obstacles and people.",
    keywords: ["beginner", "easy to fly", "GPS", "learning", "first drone"],
    publishedAt: "2025-06-16T15:20:00Z", // Converted from 45824.63889
  },
  {
    category: "Drone Technology",
    question: "How do drone obstacle avoidance sensors work?",
    shortAnswer: "They use technologies like infrared, ultrasonic, or LiDAR to detect objects and prevent collisions.",
    detailedAnswer: "Drone obstacle avoidance sensors help prevent crashes by detecting objects in the drone's flight path. They typically use a combination of technologies such as: **Infrared sensors** (detect proximity to objects), **Ultrasonic sensors** (use sound waves to measure distance, often for low-speed/close-range detection), **Visual sensors** (cameras with computer vision to map surroundings), and **LiDAR** (Light Detection and Ranging, uses lasers for precise 3D mapping of the environment). When an obstacle is detected, the drone can automatically brake, hover, or navigate around it.",
    keywords: ["sensors", "obstacle avoidance", "safety", "LiDAR", "infrared", "ultrasonic", "collision"],
    publishedAt: "2025-06-16T17:20:00Z",
  },
  {
    category: "Buying Advice",
    question: "What are the essential accessories for a new drone pilot?",
    shortAnswer: "Spare batteries, propeller guards, a good carrying case, and ND filters for camera drones.",
    detailedAnswer: "For a new drone pilot, essential accessories include extra batteries to extend flight time, propeller guards to protect against minor collisions and damage, and a durable carrying case or backpack for safe transport and organized storage. If your drone has a camera, Neutral Density (ND) filters are highly recommended for photography and videography, as they help control light in bright conditions for smoother, more professional footage.",
    keywords: ["accessories", "beginner", "spare parts", "batteries", "propeller guards", "ND filters", "carrying case"],
    publishedAt: "2025-06-16T16:30:00Z",
  },
  {
    category: "Drone Photography & Videography",
    question: "What is a gimbal and why is it important for drone photography?",
    shortAnswer: "A gimbal is a motorized stabilizer that keeps the camera level and steady during flight, ensuring smooth footage.",
    detailedAnswer: "A gimbal is a motorized, multi-axis stabilizing device that holds the drone's camera. Its importance for photography and videography cannot be overstated: it counteracts the drone's movements (pitch, roll, yaw) in real-time, keeping the camera perfectly level and stable. This results in smooth, professional-looking video footage and sharp, blur-free photos, even during dynamic drone maneuvers. Most quality camera drones come equipped with a 3-axis gimbal.",
    keywords: ["gimbal", "camera", "stabilization", "photography", "videography", "drone parts"],
    publishedAt: "2025-06-16T16:40:00Z",
  },
  {
    category: "Buying Advice",
    question: "What is a 'fly-more combo' or 'kit' when buying a drone?",
    shortAnswer: "A 'fly-more combo' is a bundled package typically including extra batteries, charging hubs, and a carrying bag for extended flight time.",
    detailedAnswer: "A 'fly-more combo' or 'fly more kit' is a common bundled package offered by drone manufacturers (like DJI) alongside the standard drone purchase. It's highly popular because it significantly enhances the flying experience. These kits typically include: **multiple extra batteries** (often 2-3), a **multi-battery charging hub** (to charge several batteries simultaneously), and a **carrying bag** or case. This allows for much longer flying sessions without waiting for batteries to recharge, and provides convenient transport for your drone and accessories. It's often more cost-effective than buying components separately.",
    keywords: ["fly more combo", "kit", "accessories", "batteries", "charging hub", "carrying case", "buying guide"],
    publishedAt: "2025-06-16T20:50:00Z", // Converted from 45824.86806
  },
  {
    category: "Buying Advice",
    question: "What types of drone controllers are available, and which is best for beginners?",
    shortAnswer: "Controllers can be dedicated remotes or smartphone apps; dedicated remotes offer more precision, ideal for learning.",
    detailedAnswer: "Drone control methods vary. Most common are: 1. **Dedicated Remote Controllers:** These have physical joysticks and buttons, offering precise, tactile control and usually a longer, more reliable signal range. Many include a screen or a mount for a smartphone/tablet. 2. **Smartphone/Tablet Apps:** Some smaller, simpler drones can be controlled directly via an app, using on-screen joysticks or device tilting. For beginners, a **dedicated remote controller** is generally recommended. It provides better tactile feedback and more accurate control, which is crucial for building fundamental flying skills and ensuring safer flights, even if you eventually integrate a smartphone for camera view.",
    keywords: ["controller", "remote", "smartphone app", "beginner", "control", "joystick"],
    publishedAt: "2025-06-16T21:10:00Z", // Converted from 45824.88542
  },
  {
    category: "General Drone Info",
    question: "What essential apps or software do drone pilots use?",
    shortAnswer: "Pilots use flight control apps, weather apps, airspace maps, and photo/video editing software.",
    detailedAnswer: "Drone pilots utilize various apps and software to enhance their flying experience and comply with regulations. Essential tools include: **Manufacturer's Flight Control Apps** (e.g., DJI Fly, DJI GO 4) for operating the drone and accessing intelligent features; **Weather Forecast Apps** (e.g., UAV Forecast) for checking wind, rain, and temperature; **Airspace Map Apps** (e.g., Drone Assist, AirMap) for identifying no-fly zones and restricted airspace; and **Photo/Video Editing Software** (desktop or mobile) for post-processing captured media. Some advanced pilots also use flight planning or logging software.",
    keywords: ["apps", "software", "flight control", "weather", "airspace", "editing", "tools"],
    publishedAt: "2025-06-16T21:15:00Z", // Converted from 45824.88889
  },
  {
    category: "Buying Advice",
    question: "Which drone brands are known for reliability and quality?",
    shortAnswer: "DJI, Autel Robotics, and sometimes Parrot are highly regarded for their reliability and quality in consumer/prosumer markets.",
    detailedAnswer: "In the consumer and prosumer drone market, **DJI** is widely considered the dominant leader, known for its extensive range of reliable, high-quality drones with advanced features and excellent camera systems (e.g., Mini, Air, Mavic series). **Autel Robotics** is another highly reputable brand, often seen as DJI's main competitor, offering robust drones with strong camera capabilities and obstacle avoidance. For specific uses, brands like **Parrot** (e.g., ANAFI series) also offer reliable options. While other brands exist, DJI and Autel are generally top choices for overall quality, reliability, and after-sales support.",
    keywords: ["brands", "reliability", "quality", "DJI", "Autel Robotics", "Parrot"],
    publishedAt: "2025-06-16T21:20:00Z", // Converted from 45824.89236
  },
  {
    category: "Buying Advice",
    question: "What kind of storage do I need for drone photos/videos?",
    shortAnswer: "High-capacity, fast microSD cards are essential for storing high-resolution drone footage.",
    detailedAnswer: "Drone cameras record large, high-resolution photo and video files, so appropriate storage is crucial. Most drones use microSD cards. You'll need high-capacity cards (e.g., 64GB, 128GB, 256GB+) and fast write speeds (indicated by UHS-I or UHS-II speed classes, or V-class ratings like V30, V60, V90) to handle 4K or higher resolution video recording without dropped frames. Always choose reputable brands like SanDisk, Lexar, or Samsung. It's also wise to have spare cards.",
    keywords: ["storage", "microSD", "memory card", "resolution", "photography", "videography", "buying guide"],
    publishedAt: "2025-06-16T20:20:00Z", // Converted from 45824.84722
  },
  {
    category: "Buying Advice",
    question: "What is the importance of flight time and battery life when buying a drone?",
    shortAnswer: "Longer flight time means more active flying per charge; having spare batteries is crucial for extended sessions.",
    detailedAnswer: "Flight time, directly related to battery life, is one of the most important factors when buying a drone. It dictates how long your drone can stay airborne on a single charge. Most consumer drones offer 20-30 minutes, while professional models might achieve 40+ minutes. For any serious use, aiming for a drone with a good flight time and purchasing multiple spare, interchangeable batteries is highly recommended. This minimizes downtime for charging and maximizes your operational efficiency.",
    keywords: ["flight time", "battery life", "batteries", "buying guide", "endurance"],
    publishedAt: "2025-06-16T20:05:00Z", // Converted from 45824.83681
  },
  {
    category: "Flight Operations & Safety",
    question: "How important is 'wind resistance' when choosing a drone?",
    shortAnswer: "Very important; a drone's wind resistance dictates its stability and safety in windy conditions, impacting footage quality.",
    detailedAnswer: "Wind resistance is a crucial specification, especially if you plan to fly outdoors frequently. A drone's ability to resist wind directly affects its stability in the air, the smoothness of its footage, and its overall safety. Lighter drones (like the Mini series) are more susceptible to wind, potentially leading to shaky video or even loss of control in strong gusts. Heavier, more powerful drones generally offer better wind resistance. Always check the manufacturer's specified maximum wind speed for safe operation, and avoid flying in conditions exceeding those limits, regardless of your drone's capability.",
    keywords: ["wind resistance", "weather", "stability", "safety", "buying guide", "performance"],
    publishedAt: "2025-06-16T20:55:00Z", // Converted from 45824.87153
  },
  {
    category: "Drone Technology",
    question: "What's the difference between a brushed and brushless motor in a drone?",
    shortAnswer: "Brushless motors are more efficient, durable, powerful, and quieter than brushed motors, common in quality drones.",
    detailedAnswer: "Drone motors come in two main types: brushed and brushless. **Brushed motors** are simpler, cheaper, and found in many toy or entry-level drones. They use carbon brushes that wear out over time, making them less durable and efficient. **Brushless motors**, on the other hand, are more complex and expensive but offer significantly higher efficiency, greater power output, longer lifespan, less noise, and better heat dissipation. Almost all high-quality consumer and professional drones utilize brushless motors due to their superior performance and reliability.",
    keywords: ["motors", "brushed", "brushless", "drone parts", "efficiency", "durability", "buying guide"],
    publishedAt: "2025-06-16T21:05:00Z", // Converted from 45824.87847
  },
  {
    category: "Drone Technology",
    question: "What is a drone's 'flight controller' and why is it important?",
    shortAnswer: "The flight controller is the 'brain' of the drone, interpreting commands and stabilizing flight using sensors.",
    detailedAnswer: "The flight controller (FC) is arguably the most important electronic component of a drone, acting as its 'brain.' It receives commands from the remote pilot, processes data from various onboard sensors (like gyroscopes, accelerometers, barometers, GPS), and then sends instructions to the motors (via ESCs) to adjust their speed. This continuous process enables the drone to maintain stability, execute precise maneuvers, and perform advanced functions like hovering, auto-landing, and intelligent flight modes. The quality of the flight controller directly impacts the drone's stability, responsiveness, and overall flight performance.",
    keywords: ["flight controller", "FC", "brain", "sensors", "stability", "control", "drone parts"],
    publishedAt: "2025-06-16T21:00:00Z", // Converted from 45824.88194
  },
  {
    category: "Buying Advice",
    question: "Are drone warranties important, and what do they typically cover?",
    shortAnswer: "Yes, warranties are important; they typically cover manufacturing defects, but often exclude crash damage without special care plans.",
    detailedAnswer: "Drone warranties are important for protecting your investment. They typically cover manufacturing defects and faults that occur under normal use within a specified period (e.g., 1-2 years). However, it's crucial to understand that standard warranties often *do not* cover damage caused by crashes, water immersion, or user error. Many manufacturers offer optional extended care plans (e.g., DJI Care Refresh) that provide replacement units or repair services for accidental damage at a reduced cost, which can be highly valuable for new or active pilots. Always read the warranty terms carefully.",
    keywords: ["warranty", "insurance", "repair", "crash", "coverage", "buying guide"],
    publishedAt: "2025-06-16T21:35:00Z", // Converted from 45824.89931
  },
  {
    category: "Drone Technology",
    question: "What is 'ActiveTrack' or 'Follow Me' feature on a drone?",
    shortAnswer: "ActiveTrack/Follow Me allows the drone to automatically follow a moving subject without manual control.",
    detailedAnswer: "'ActiveTrack' (DJI's term) or 'Follow Me' is an intelligent flight mode that enables the drone to automatically recognize, lock onto, and follow a moving subject (e.g., a person, vehicle, or animal). The drone uses its vision sensors and advanced algorithms to maintain a set distance and angle from the subject while recording. This feature is incredibly useful for solo content creators, capturing dynamic action shots, or for applications like sports filming where the pilot needs to focus on the subject rather than constantly maneuvering the drone. Obstacle avoidance systems are crucial for safe operation in these modes.",
    keywords: ["ActiveTrack", "Follow Me", "intelligent flight modes", "tracking", "automation", "features"],
    publishedAt: "2025-06-16T21:40:00Z", // Converted from 45824.90278
  },
  {
    category: "Buying Advice",
    question: "Are propeller guards necessary, and when should I use them?",
    shortAnswer: "Propeller guards are highly recommended for beginners or indoor flying to protect props and prevent injury.",
    detailedAnswer: "Propeller guards are plastic or carbon fiber rings that surround the drone's propellers. They are highly recommended, especially for **beginners** who are still learning to fly, or for **indoor flying**. Their primary benefits are: 1. **Protection:** They prevent propellers from hitting obstacles (walls, branches) which can cause damage to the drone or lead to a crash. 2. **Safety:** They reduce the risk of injury to people or pets from spinning blades. While they can add weight and slightly reduce flight time, the added protection and safety are often worth it, particularly when flying in confined spaces or around others.",
    keywords: ["propeller guards", "safety", "accessories", "beginner", "indoor flying", "protection"],
    publishedAt: "2025-06-16T21:55:00Z", // Converted from 45824.91319
  },
  {
    category: "Buying Advice",
    question: "Are there specific safety features to look for in a drone for beginners?",
    shortAnswer: "Yes, look for GPS stabilization, obstacle avoidance, Return-to-Home (RTH), and propeller guards.",
    detailedAnswer: "For beginners, several safety features can make the learning process much safer and more enjoyable: 1. **GPS Stabilization:** Allows the drone to hold its position accurately, making it much easier to hover and control. 2. **Obstacle Avoidance Sensors:** These (ultrasonic, infrared, visual) detect nearby obstacles and can automatically brake or navigate around them, greatly reducing collision risk. 3. **Return-to-Home (RTH):** Automatically brings the drone back to its takeoff point if signal is lost or battery is low. 4. **Propeller Guards:** Protect the propellers from minor impacts and reduce the risk of injury. 5. **Beginner Mode:** Limits speed and range for a more controlled learning experience.",
    keywords: ["safety features", "beginner", "obstacle avoidance", "GPS", "RTH", "propeller guards", "buying guide"],
    publishedAt: "2025-06-16T22:10:00Z", // Converted from 45824.92361
  },
  {
    category: "Drone Technology",
    question: "What are 'Intelligent Flight Modes' and why are they useful?",
    shortAnswer: "Intelligent Flight Modes are automated features (e.g., Follow Me, Orbit) that simplify complex shots and maneuvers.",
    detailedAnswer: "Intelligent Flight Modes (or Smart Flight Modes) are pre-programmed automated flight patterns that simplify complex camera movements and make flying easier. Examples include: **Follow Me** (drone tracks a moving subject), **Orbit** (drone circles a point of interest), **Waypoint Navigation** (drone flies a pre-set path), **ActiveTrack** (advanced subject tracking), and **QuickShots** (pre-programmed cinematic movements). These modes are extremely useful for beginners to capture professional-looking footage and for experienced pilots to execute precise, repeatable shots with less manual effort.",
    keywords: ["intelligent flight modes", "smart features", "automation", "follow me", "orbit", "waypoints", "buying guide"],
    publishedAt: "2025-06-16T20:15:00Z", // Converted from 45824.84375
  },
  {
    category: "Maintenance & Care",
    question: "How often should I update my drone's firmware?",
    shortAnswer: "Keep your drone's firmware updated regularly to ensure optimal performance and access to new features.",
    detailedAnswer: "Drone manufacturers frequently release firmware updates that can improve flight stability, add new features, enhance safety, and fix bugs. It's recommended to check for updates every few weeks or before important flights. Always follow the manufacturer's instructions carefully during the update process to avoid issues.",
    keywords: ["firmware", "update", "maintenance", "software"],
    publishedAt: "2025-06-16T16:00:00Z", // Converted from 45824.66667
  },
  {
    category: "Maintenance & Care",
    question: "What kind of maintenance does a drone need?",
    shortAnswer: "Regular checks include inspecting propellers, battery health, camera lens, and cleaning sensors.",
    detailedAnswer: "Routine drone maintenance involves inspecting propellers for cracks or damage, checking battery health and charge cycles, cleaning the camera lens, and ensuring all sensors (like obstacle avoidance and GPS) are free from dust or obstructions. Also, periodically check motor arms and landing gear for any looseness or wear. Store batteries at recommended levels.",
    keywords: ["maintenance", "care", "propellers", "battery", "cleaning", "sensors"],
    publishedAt: "2025-06-16T16:05:00Z", // Converted from 45824.67014
  },
  {
    category: "Maintenance & Care",
    question: "How often should I change my drone's propellers?",
    shortAnswer: "Propellers should be changed every 50 hours of flight time or 200 flights, sooner if damaged.",
    detailedAnswer: "Drone propellers are critical for safe and efficient flight. It's recommended to replace them every 50 hours of flight time or every 200 flights, whichever comes first. Always inspect propellers for any cracks, chips, bends, or damage before each flight, and replace immediately if any imperfections are found, as even minor damage can affect stability and safety.",
    keywords: ["propellers", "maintenance", "drone parts", "replacement"],
    publishedAt: "2025-06-16T16:00:00Z", // Converted from 45824.66667
  },
  {
    category: "Buying Advice",
    question: "How do I choose the right propellers for my drone?",
    shortAnswer: "Match propellers to your drone model; choose based on desired flight characteristics like speed or efficiency.",
    detailedAnswer: "Propellers are crucial for drone performance. Always use propellers designed for your specific drone model. Different propeller types (e.g., low-noise, high-efficiency, or high-speed) can affect flight time, noise levels, and responsiveness. Inspect them regularly for nicks, cracks, or bends, as damaged props can lead to unstable flight or crashes.",
    keywords: ["propellers", "replacement", "efficiency", "speed", "maintenance"],
    publishedAt: "2025-06-16T16:30:00Z", // Converted from 45824.6875
  },
  {
    category: "Troubleshooting",
    question: "My drone isn't responding to controls; what's the fix?",
    shortAnswer: "Restart both drone and controller, check for interference, and ensure a strong connection.",
    detailedAnswer: "If your drone becomes unresponsive to controls, first power off both the drone and the remote controller, then power them back on to re-establish the connection. Fly in open areas away from strong Wi-Fi networks, power lines, or other electronic devices that can cause signal interference. Check the antennas on both your drone and controller for any damage and ensure they are properly positioned for optimal signal transmission.",
    keywords: ["troubleshooting", "controls", "connection", "signal loss", "remote controller", "interference"],
    publishedAt: "2025-06-16T16:30:00Z", // Converted from 45824.6875
  },
  {
    category: "Maintenance & Care",
    question: "How do I update my drone's firmware and software?",
    shortAnswer: "Regularly check the manufacturer's app/website for updates and follow their specific instructions.",
    detailedAnswer: "Keeping your drone's firmware (software on the drone) and the accompanying flight application (on your phone/tablet or controller) up-to-date is crucial for performance, bug fixes, and new features. Always check the drone manufacturer's official website or app for the latest updates. Follow their instructions precisely, ensuring your batteries are fully charged during the update process to prevent bricking the device.",
    keywords: ["firmware", "software", "update", "troubleshooting", "bug fix"],
    publishedAt: "2025-06-16T16:35:00Z", // Converted from 45824.69097
  },
  {
    category: "Troubleshooting",
    question: "My drone is drifting or flying erratically; what should I do?",
    shortAnswer: "Recalibrate sensors, check for damage, and ensure propellers are correctly installed.",
    detailedAnswer: "If your drone is drifting or flying erratically, the first step is to **recalibrate its sensors**, particularly the compass and IMU (Inertial Measurement Unit), as per your manufacturer's instructions. Ensure there's no physical damage to the propellers, motors, or frame. Fly in an open area away from magnetic interference (e.g., large metal structures, power lines). If the problem persists, check for firmware updates or consult the drone's manual and support resources.",
    keywords: ["drifting", "erratic flight", "troubleshooting", "calibration", "sensors", "IMU", "compass"],
    publishedAt: "2025-06-16T16:40:00Z", // Converted from 45824.69444
  },
];

// In a real Sanity.io setup, you would initialize the client like this:
// import { createClient } from '@sanity/client';
// const client = createClient({
//   projectId: '50lnhjt6', // Your project ID
//   dataset: 'production', // Your dataset name
//   apiVersion: '2023-05-03', // Use a stable API version
//   useCdn: true, // `false` if you want to ensure fresh data
// });

// For this simulation, we'll just return the mock data after a delay.
const mockSanityClient = {
  fetch: (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate a Sanity query to get all FAQs and their categories
        // In a real query, you might join 'faq' with 'faqCategory'
        // Example query: `*[_type == "faq"]{..., category->{title}}`
        resolve(mockFaqData);
      }, 1000); // Simulate network delay
    });
  },
};

export default mockSanityClient;