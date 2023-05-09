import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderHead, e as renderComponent, f as renderSlot, s as spreadAttributes, g as createVNode, F as Fragment } from '../astro.02e5833e.mjs';
import 'html-escaper';
/* empty css                           *//* empty css                                                 *//* empty css                            *//* empty css                                                 *//* empty css                          */
const $$Astro$a = createAstro("https://rbclair.me");
const $$NavBar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$NavBar;
  return renderTemplate`${maybeRenderHead($$result)}<nav class="navbar astro-YMHDP2RL">
	<div class="navbar-logo astro-YMHDP2RL">
		<a href="/" class="astro-YMHDP2RL">
			<h1 class="astro-YMHDP2RL">
				<span class="text-gradient astro-YMHDP2RL">Rebecca Clair</span>
			</h1>
		</a>
	</div>
	<ul class="navbar-links astro-YMHDP2RL">
		<li class="astro-YMHDP2RL">
			<a href="/" class="astro-YMHDP2RL">Home</a>
		</li>
		<li class="astro-YMHDP2RL">
			<a href="/resume" class="astro-YMHDP2RL">Resume</a>
		</li>
		<li class="astro-YMHDP2RL">
			<a href="/projects" class="astro-YMHDP2RL">Projects</a>
		</li>
		<li class="astro-YMHDP2RL">
			<a href="/photography" class="astro-YMHDP2RL">Photography</a>
		</li>
		<li class="astro-YMHDP2RL">
			<a href="/music" class="astro-YMHDP2RL">Music</a>
		</li>
		<li class="astro-YMHDP2RL">
			<a href="/blog" class="astro-YMHDP2RL">Blog</a>
		</li>
	</ul>
	<div class="navbar-toggle astro-YMHDP2RL">
		<span class="astro-YMHDP2RL"></span>
		<span class="astro-YMHDP2RL"></span>
		<span class="astro-YMHDP2RL"></span>
	</div>
</nav>`;
}, "C:/Devel/projects/web/heliasar/src/components/NavBar.astro");

const $$Astro$9 = createAstro("https://rbclair.me");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead($$result)}<footer class="astro-SZ7XMLTE">
</footer>`;
}, "C:/Devel/projects/web/heliasar/src/components/Footer.astro");

const $$Astro$8 = createAstro("https://rbclair.me");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width">
		<link rel="icon" type="image/svg+xml" href="/favicon.svg">
		<meta name="generator"${addAttribute(Astro2.generator, "content")}>
		<title>${title} - Rebecca Clair</title>

		<link rel="sitemap" href="/sitemap-index.xml">

		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
	${renderHead($$result)}</head>
	<body>
		${renderComponent($$result, "NavBar", $$NavBar, {})}

		${renderSlot($$result, $$slots["default"])}

		${renderComponent($$result, "Footer", $$Footer, {})}
	</body></html>`;
}, "C:/Devel/projects/web/heliasar/src/layouts/Layout.astro");

const $$Astro$7 = createAstro("https://rbclair.me");
const $$Social = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Social;
  const { url, platform } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(url, "href")} target="_blank" class="astro-YXTIFMRQ">${platform}</a>`;
}, "C:/Devel/projects/web/heliasar/src/components/Social.astro");

const $$Astro$6 = createAstro("https://rbclair.me");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home", "class": "astro-J7PV25F6" }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead($$result2)}<main class="astro-J7PV25F6">
		<h1 class="astro-J7PV25F6"><span class="text-gradient astro-J7PV25F6">Rebecca Clair</span></h1>

		<div class="bio-container astro-J7PV25F6">
			<img class="shadow-img astro-J7PV25F6" src="/images/rebecca_clair.jpg" alt="Rebecca Clair">

			<div class="bio astro-J7PV25F6">
				<p class="astro-J7PV25F6">
					Experienced senior full stack engineer with a demonstrated history
					of working in the computer software industry. Highly skilled in
					C++ / Qt, Ruby, JavaScript, Typescript, and web technologies
					including HTML and CSS, React.
				</p>
				<p class="astro-J7PV25F6">
					Additionally, well-developed skills in Internet of Things,
					Embedded Systems, and software development with RFID technology,
					and distributed microservice architectures using MQTT and ZeroMQ.
				</p>
				<p class="astro-J7PV25F6">
					With 10+ years of experience working and managing diverse and
					large teams with effective communication to complete the
					engineering of successful applications.
				</p>
				<p class="astro-J7PV25F6">
					In my free time I enjoy practicing extreme sports, creating music
					and painting.
				</p>

				<div class="bio-social astro-J7PV25F6">
					${renderComponent($$result2, "Social", $$Social, { "url": "https://github.com/becksClair", "platform": "github", "class": "astro-J7PV25F6" })}
					${renderComponent($$result2, "Social", $$Social, { "url": "https://www.linkedin.com/in/rebecca-clair/", "platform": "linkedin", "class": "astro-J7PV25F6" })}
					${renderComponent($$result2, "Social", $$Social, { "url": "https://twitter.com/becksClair", "platform": "twitter", "class": "astro-J7PV25F6" })}
				</div>
			</div>
		</div>
	</main>
` })}`;
}, "C:/Devel/projects/web/heliasar/src/pages/index.astro");

const $$file$4 = "C:/Devel/projects/web/heliasar/src/pages/index.astro";
const $$url$4 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file$4,
	url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro("https://rbclair.me");
const $$Photography = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Photography;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Photography" })}`;
}, "C:/Devel/projects/web/heliasar/src/pages/photography.astro");

const $$file$3 = "C:/Devel/projects/web/heliasar/src/pages/photography.astro";
const $$url$3 = "/photography";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Photography,
	file: $$file$3,
	url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro("https://rbclair.me");
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Projects;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Projects" })}`;
}, "C:/Devel/projects/web/heliasar/src/pages/projects.astro");

const $$file$2 = "C:/Devel/projects/web/heliasar/src/pages/projects.astro";
const $$url$2 = "/projects";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Projects,
	file: $$file$2,
	url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro("https://rbclair.me");
const $$ResumeLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ResumeLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": frontmatter.title, "class": "astro-ECWVKBFV" }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead($$result2)}<main class="astro-ECWVKBFV">
		<h1 class="astro-ECWVKBFV">${frontmatter.title}</h1>

		<div class="content astro-ECWVKBFV">
			<div class="post-image-container astro-ECWVKBFV">
				<img class="post-img shadow-img astro-ECWVKBFV"${addAttribute(frontmatter.image.url, "src")} width="300"${addAttribute(frontmatter.image.alt, "alt")}>
			</div>
			${renderSlot($$result2, $$slots["default"])}
		</div>

	</main>
` })}`;
}, "C:/Devel/projects/web/heliasar/src/layouts/ResumeLayout.astro");

const images$1 = {
					
				};

				function updateImageReferences$1(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="(.+)"/gm,
						(full, imagePath) => spreadAttributes({src: images$1[imagePath].src, ...images$1[imagePath].attributes})
					);
				}

				const html$1 = updateImageReferences$1("<h2 id=\"introduction\">Introduction</h2>\n<p>Experienced senior full stack engineer with a demonstrated history of working in the computer software industry. Highly skilled in C++ / Qt, Ruby, JavaScript, Typescript, and web technologies including HTML and CSS, React.</p>\n<p>Additionally, well-developed skills in Internet of Things, Embedded Systems, and software development with RFID technology, and distributed microservice architectures using MQTT and ZeroMQ.</p>\n<p>With +15 years of experience working and managing diverse and large teams with effective communication to complete the engineering of successful applications.</p>\n<p>In my free time I enjoy practicing extreme sports, creating music and painting.</p>\n<p><a href=\"https://github.com/becksClair\">GitHub</a> <a href=\"https://linkedin.com/in/rebecca-clair\">LinkedIn</a> <a href=\"https://twitter.com/becksClair\">Twitter</a></p>\n<h2 id=\"experience\">Experience</h2>\n<h3 id=\"seddi\">SEDDI</h3>\n<h4 id=\"software-engineer-senior-2023---present\">SOFTWARE ENGINEER (SENIOR) 2023 - PRESENT</h4>\n<p>Member of the front-end development team creating tools for 2D and 3D for clothing design on the web using React.</p>\n<p>My role involved improving the architecture of the application, adding tooling to improve development time, and helping with the implementation of tools for image processing similarly to those on programs like Photoshop.</p>\n<p>On this role I started a progressive migration to Typescript, used tools like Playwright for integration testing, Jest for unit testing and ESLint for error checking.</p>\n<p>I  bootstrapped  a  new  component  architecture  of  centralized  layout  components  to  ease  the  development of future tooling and helped with the UX design of the overall application.</p>\n<h3 id=\"voicemod-sl\">Voicemod SL</h3>\n<h4 id=\"software-engineer-senior---technical-lead-2021---2022\">SOFTWARE ENGINEER (SENIOR) - TECHNICAL LEAD 2021 - 2022</h4>\n<p>Technical lead, in the team responsible of the migration of a C# desktop app to a cross-platform app in C++ with Qt, ZeroMQ, etc. Implementing a microservice architecture using ZeroMQ. Using a frontend built with VueJS.</p>\n<p>Part of my tasks were coordination of team resources, task assignments, project management, and unblocking tasks for the various teams.</p>\n<p>Creating tooling to ease dependency management and I created a tool to wrap and greatly simplify using the Conan package manager.</p>\n<p>Link to the article about the tool And implementing workflows for generating multi-binary builds on the Cl pipelines with the newly introduced Apple Silicon architecture.</p>\n<h3 id=\"heliasar-productions\">HeliaSar Productions</h3>\n<h4 id=\"software-engineer-senior-2010-present\">SOFTWARE ENGINEER (SENIOR) 2010-PRESENT</h4>\n<p>Analyzed client requirements and provided automations and full-stack solutions with Ruby on Rails, JavaScript, Typescript, React, C++, C#, and other technologies. Working a wide range of projects and industries, that challenged me to keep always learning and always finding creative solutions to complex business problems. Dealt with client support, managing a business and marketing it.</p>\n<h3 id=\"senitron-corp\">Senitron Corp</h3>\n<h4 id=\"software-engineer-senior-2014-2020\">SOFTWARE ENGINEER (SENIOR) 2014-2020</h4>\n<p>Worked at a startup in Los Angeles, worked remote for several years, and 2 years working on-site in Los Angeles. I was the main responsible for implementing new functionality in the web application, using Ruby on Rails, SQL, JavaScript, etc.</p>\n<p>I  was  also  responsible  for  researching  and  implementing  new  software  technologies  to  control  embedded devices with RFID in C++ and D.</p>\n<p>Created as well, several back-office and POS applications in C++ with Qt, Java, and C#.</p>\n<h3 id=\"coffee--power\">Coffee &#x26; Power</h3>\n<h4 id=\"software-engineer-junior-2010--2012\">SOFTWARE ENGINEER (JUNIOR) 2010 -2012</h4>\n<p>Web and mobile development in HTML / CSS - PHP and JavaScript specialized in application architecture, backend implementation and fronted coding.</p>\n<p>Credited work:</p>\n<ul>\n<li>Coffee and Power web and mobile sites - Worklist.net site</li>\n<li>Worklist.net’s Journal site</li>\n</ul>\n<h3 id=\"lovemachine-inc\">LoveMachine, Inc</h3>\n<h4 id=\"software-engineer-junior-2010--2011\">SOFTWARE ENGINEER (JUNIOR) 2010 -2011</h4>\n<p>Web and mobile development in HTML / CSS - PHP and JavaScript specialized in application architecture, backend implementation and fronted coding.</p>\n<p>Credited work:</p>\n<ul>\n<li>Coffee and Power web and mobile sites - Worklist.net site</li>\n<li>Worklist.net’s Journal site</li>\n<li>Sendlove (formerly Lovemachine) - Admin Panel</li>\n<li>Interproject backend api/administration software</li>\n</ul>\n<h2 id=\"courses\">Courses</h2>\n<p>Introduction to Neuroscience - 2013<br>\n<strong>UNIVERSIDAD DE BERKELEY</strong></p>\n<p>Introduction to Artificial Intelligence - 2012<br>\n<strong>UNIVERSIDAD DE STANFORD</strong></p>\n<p>iPad and iPhone App Development - 2012<br>\n<strong>UNIVERSIDAD DE STANFORD</strong></p>\n<h2 id=\"languages\">Languages</h2>\n<ul>\n<li>\n<p><strong>Spanish (Native)</strong></p>\n</li>\n<li>\n<p><strong>English (Bilingual)</strong></p>\n</li>\n<li>\n<p><strong>Catalan (Elementary)</strong></p>\n</li>\n<li>\n<p><strong>French (Basic)</strong></p>\n</li>\n<li>\n<p><strong>Norwegian (Basic)</strong></p>\n</li>\n</ul>\n<h2 id=\"technologies\">Technologies</h2>\n<p>RUBY, PHP, CSS, HTML, JAVASCRIPT, REACT, SOLIDJS, TYPESCRIPT, JEST, PLAYWRIGHT, VUE, WORDPRESS, C, C++, C#, D, KOTLIN, POSTGRESQL, SQL, MYSQL, SQLITE, IOS, SWIFT, ANDROID, JAVA, JQUERY, QT, XAMARIN, XAML, WPF, UWP, REST, API, PASCAL, DELPHI, ASSEMBLY, GOLANG, OPENCV, PYTHON, BASH, POWERSHELL, NGINX, UBUNTU, REDHAT, RHEL, ARDUINO, IOT, MQTT, RFID, ZEBRA, ZPL, GIT, AGILE, SCRUM, PROJECT MANAGEMENT, CHATGPT, CONTINOUS INTEGRATION, CI/CD</p>");

				const frontmatter$1 = {"layout":"../layouts/ResumeLayout.astro","title":"Resume","pubDate":"2023-05-09T00:00:00.000Z","description":"Rebecca Clair - Senior Software Engineer","author":"Rebecca Clair","image":{"url":"/images/rebecca_clair.jpg","alt":"Rebecca Clair"}};
				const file$1 = "C:/Devel/projects/web/heliasar/src/pages/resume.md";
				const url$1 = "/resume";
				function rawContent$1() {
					return "\n\n## Introduction\n\nExperienced senior full stack engineer with a demonstrated history of working in the computer software industry. Highly skilled in C++ / Qt, Ruby, JavaScript, Typescript, and web technologies including HTML and CSS, React.\n\nAdditionally, well-developed skills in Internet of Things, Embedded Systems, and software development with RFID technology, and distributed microservice architectures using MQTT and ZeroMQ.\n\nWith +15 years of experience working and managing diverse and large teams with effective communication to complete the engineering of successful applications.\n\nIn my free time I enjoy practicing extreme sports, creating music and painting.\n\n[GitHub](https://github.com/becksClair) [LinkedIn](https://linkedin.com/in/rebecca-clair) [Twitter](https://twitter.com/becksClair)\n\n## Experience\n\n### SEDDI\n\n#### SOFTWARE ENGINEER (SENIOR) 2023 - PRESENT\n\nMember of the front-end development team creating tools for 2D and 3D for clothing design on the web using React.\n\nMy role involved improving the architecture of the application, adding tooling to improve development time, and helping with the implementation of tools for image processing similarly to those on programs like Photoshop.\n\nOn this role I started a progressive migration to Typescript, used tools like Playwright for integration testing, Jest for unit testing and ESLint for error checking.\n\nI  bootstrapped  a  new  component  architecture  of  centralized  layout  components  to  ease  the  development of future tooling and helped with the UX design of the overall application.\n\n### Voicemod SL\n\n#### SOFTWARE ENGINEER (SENIOR) - TECHNICAL LEAD 2021 - 2022\n\nTechnical lead, in the team responsible of the migration of a C# desktop app to a cross-platform app in C++ with Qt, ZeroMQ, etc. Implementing a microservice architecture using ZeroMQ. Using a frontend built with VueJS.\n\nPart of my tasks were coordination of team resources, task assignments, project management, and unblocking tasks for the various teams.\n\nCreating tooling to ease dependency management and I created a tool to wrap and greatly simplify using the Conan package manager.\n\nLink to the article about the tool And implementing workflows for generating multi-binary builds on the Cl pipelines with the newly introduced Apple Silicon architecture.\n\n### HeliaSar Productions\n\n#### SOFTWARE ENGINEER (SENIOR) 2010-PRESENT\n\nAnalyzed client requirements and provided automations and full-stack solutions with Ruby on Rails, JavaScript, Typescript, React, C++, C#, and other technologies. Working a wide range of projects and industries, that challenged me to keep always learning and always finding creative solutions to complex business problems. Dealt with client support, managing a business and marketing it.\n\n### Senitron Corp\n\n#### SOFTWARE ENGINEER (SENIOR) 2014-2020\n\nWorked at a startup in Los Angeles, worked remote for several years, and 2 years working on-site in Los Angeles. I was the main responsible for implementing new functionality in the web application, using Ruby on Rails, SQL, JavaScript, etc.\n\nI  was  also  responsible  for  researching  and  implementing  new  software  technologies  to  control  embedded devices with RFID in C++ and D.\n\nCreated as well, several back-office and POS applications in C++ with Qt, Java, and C#.\n\n### Coffee & Power\n\n#### SOFTWARE ENGINEER (JUNIOR) 2010 -2012\n\nWeb and mobile development in HTML / CSS - PHP and JavaScript specialized in application architecture, backend implementation and fronted coding.\n\nCredited work:\n\n- Coffee and Power web and mobile sites - Worklist.net site\n- Worklist.net's Journal site\n\n### LoveMachine, Inc\n\n#### SOFTWARE ENGINEER (JUNIOR) 2010 -2011\n\nWeb and mobile development in HTML / CSS - PHP and JavaScript specialized in application architecture, backend implementation and fronted coding.  \n\nCredited work:\n\n- Coffee and Power web and mobile sites - Worklist.net site\n- Worklist.net's Journal site\n- Sendlove (formerly Lovemachine) - Admin Panel\n- Interproject backend api/administration software\n\n## Courses\n\nIntroduction to Neuroscience - 2013  \n**UNIVERSIDAD DE BERKELEY**\n\nIntroduction to Artificial Intelligence - 2012  \n**UNIVERSIDAD DE STANFORD**\n\niPad and iPhone App Development - 2012  \n**UNIVERSIDAD DE STANFORD**\n\n## Languages\n\n- **Spanish (Native)**\n\n- **English (Bilingual)**\n\n- **Catalan (Elementary)**\n\n- **French (Basic)**\n\n- **Norwegian (Basic)**\n\n## Technologies\n\nRUBY, PHP, CSS, HTML, JAVASCRIPT, REACT, SOLIDJS, TYPESCRIPT, JEST, PLAYWRIGHT, VUE, WORDPRESS, C, C++, C#, D, KOTLIN, POSTGRESQL, SQL, MYSQL, SQLITE, IOS, SWIFT, ANDROID, JAVA, JQUERY, QT, XAMARIN, XAML, WPF, UWP, REST, API, PASCAL, DELPHI, ASSEMBLY, GOLANG, OPENCV, PYTHON, BASH, POWERSHELL, NGINX, UBUNTU, REDHAT, RHEL, ARDUINO, IOT, MQTT, RFID, ZEBRA, ZPL, GIT, AGILE, SCRUM, PROJECT MANAGEMENT, CHATGPT, CONTINOUS INTEGRATION, CI/CD\n";
				}
				function compiledContent$1() {
					return html$1;
				}
				function getHeadings$1() {
					return [{"depth":2,"slug":"introduction","text":"Introduction"},{"depth":2,"slug":"experience","text":"Experience"},{"depth":3,"slug":"seddi","text":"SEDDI"},{"depth":4,"slug":"software-engineer-senior-2023---present","text":"SOFTWARE ENGINEER (SENIOR) 2023 - PRESENT"},{"depth":3,"slug":"voicemod-sl","text":"Voicemod SL"},{"depth":4,"slug":"software-engineer-senior---technical-lead-2021---2022","text":"SOFTWARE ENGINEER (SENIOR) - TECHNICAL LEAD 2021 - 2022"},{"depth":3,"slug":"heliasar-productions","text":"HeliaSar Productions"},{"depth":4,"slug":"software-engineer-senior-2010-present","text":"SOFTWARE ENGINEER (SENIOR) 2010-PRESENT"},{"depth":3,"slug":"senitron-corp","text":"Senitron Corp"},{"depth":4,"slug":"software-engineer-senior-2014-2020","text":"SOFTWARE ENGINEER (SENIOR) 2014-2020"},{"depth":3,"slug":"coffee--power","text":"Coffee & Power"},{"depth":4,"slug":"software-engineer-junior-2010--2012","text":"SOFTWARE ENGINEER (JUNIOR) 2010 -2012"},{"depth":3,"slug":"lovemachine-inc","text":"LoveMachine, Inc"},{"depth":4,"slug":"software-engineer-junior-2010--2011","text":"SOFTWARE ENGINEER (JUNIOR) 2010 -2011"},{"depth":2,"slug":"courses","text":"Courses"},{"depth":2,"slug":"languages","text":"Languages"},{"depth":2,"slug":"technologies","text":"Technologies"}];
				}
				async function Content$1() {
					const { layout, ...content } = frontmatter$1;
					content.file = file$1;
					content.url = url$1;
					const contentFragment = createVNode(Fragment, { 'set:html': html$1 });
					return createVNode($$ResumeLayout, {
									file: file$1,
									url: url$1,
									content,
									frontmatter: content,
									headings: getHeadings$1(),
									rawContent: rawContent$1,
									compiledContent: compiledContent$1,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$1[Symbol.for('astro.needsHeadRendering')] = false;

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content: Content$1,
	compiledContent: compiledContent$1,
	default: Content$1,
	file: file$1,
	frontmatter: frontmatter$1,
	getHeadings: getHeadings$1,
	images: images$1,
	rawContent: rawContent$1,
	url: url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro("https://rbclair.me");
const $$Music = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Music;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Music" })}`;
}, "C:/Devel/projects/web/heliasar/src/pages/music.astro");

const $$file$1 = "C:/Devel/projects/web/heliasar/src/pages/music.astro";
const $$url$1 = "/music";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Music,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("https://rbclair.me");
const $$BlogPostLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogPostLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": frontmatter.title, "class": "astro-2Q5OECFC" }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead($$result2)}<main class="astro-2Q5OECFC">
		<h1 class="astro-2Q5OECFC">${frontmatter.title}</h1>

		<div class="content astro-2Q5OECFC">
			<div class="post-image-container astro-2Q5OECFC">
				<img class="post-img shadow-img astro-2Q5OECFC"${addAttribute(frontmatter.image.url, "src")} width="300"${addAttribute(frontmatter.image.alt, "alt")}>
			</div>
			${renderSlot($$result2, $$slots["default"])}
		</div>

		<p class="article-meta astro-2Q5OECFC">
			Written by ${frontmatter.author}<br class="astro-2Q5OECFC">
			Last updated on ${new Date(frontmatter.pubDate).toLocaleDateString()}
		</p>
	</main>
` })}`;
}, "C:/Devel/projects/web/heliasar/src/layouts/BlogPostLayout.astro");

const images = {
					
				};

				function updateImageReferences(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="(.+)"/gm,
						(full, imagePath) => spreadAttributes({src: images[imagePath].src, ...images[imagePath].attributes})
					);
				}

				const html = updateImageReferences("<p>As a software engineer, I’ve always been passionate about creating personal projects that showcase my skills and interests. Recently, I decided to create my new website using Astro, a static site builder that allows for the use of React components.</p>\n<p>The purpose of my website is to act as a portfolio project host, a place where I can showcase my personal photography projects and music creations as a DJ. Astro appealed to me because of its performance, flexibility and the ability to incorporate React components into a static site.</p>\n<h2 id=\"why-astro\">Why Astro?</h2>\n<p>Astro is a static site builder that is designed to bring modern web development to static sites. It allows developers to use React components, Sass, and other modern web development tools to create fast, responsive sites. Additionally, it provides features like code splitting, prefetching, and lazy loading, which helps to improve site performance.</p>\n<p>One of the major benefits of using Astro is the ability to create dynamic, interactive components that can be reused throughout the site. This is particularly useful when building a portfolio site, as it allows for the easy creation of custom components to showcase projects.</p>\n<h2 id=\"creating-my-site\">Creating My Site</h2>\n<p>The first step in creating my site was to set up a basic Astro project structure. This involved creating a new Astro project and configuring the project settings to my preferences. I chose to use Sass for styling, and also set up a few basic site pages, including a homepage and pages for my photography and music projects.</p>\n<p>For my photography page, I created a custom component to display my portfolio of photos. I used the Masonry layout library to create a dynamic grid layout that would adapt to different screen sizes. Additionally, I incorporated a lightbox plugin to allow visitors to view larger versions of the photos.</p>\n<p>On my music page, I created a custom component to showcase my DJ mixes. I used the Howler.js library to create a custom audio player that would allow visitors to play and pause the music. Additionally, I created custom artwork for each mix and incorporated it into the player.</p>\n<h2 id=\"deploying-my-site\">Deploying My Site</h2>\n<p>Once my site was complete, I needed to deploy it to a hosting service. I chose to use Vercel, a popular site hosting service that provides easy deployment and continuous integration, and serverless functions for advanced site features.</p>\n<p>To deploy my site, I first connected my Git repository to Vercel. I then configured the deployment settings to build my Astro site and deploy it to a custom domain. Vercel also provided features like HTTPS support, automatic builds, and CDNs to improve site performance.</p>\n<h2 id=\"conclusion\">Conclusion</h2>\n<p>Creating my own website with Astro was a fun and rewarding experience. Astro’s flexibility and use of modern web development tools allowed me to create a fast, responsive site that showcases my personal projects. Additionally, deploying my site to Vercel was quick and easy, allowing me to share my work with others.</p>\n<p>If you’re a software engineer looking to create a portfolio site or showcase personal projects, I highly recommend giving Astro a try. Its use of React components and modern web development tools makes it a great choice for creating dynamic, interactive sites.</p>");

				const frontmatter = {"layout":"../../layouts/BlogPostLayout.astro","title":"Personal Website with Astro","pubDate":"2023-05-07T00:00:00.000Z","description":"Creating a Personal Website with Astro","author":"Rebecca Clair","image":{"url":"/images/posts/fb9c0c69-7730-4ce9-b267-e68db31feb75.webp","alt":"Abstract Astro and React"},"tags":["astro","website","react","vercel","blogging"]};
				const file = "C:/Devel/projects/web/heliasar/src/pages/posts/personal-website-with-astro.md";
				const url = "/posts/personal-website-with-astro";
				function rawContent() {
					return "\nAs a software engineer, I've always been passionate about creating personal projects that showcase my skills and interests. Recently, I decided to create my new website using Astro, a static site builder that allows for the use of React components.\n\nThe purpose of my website is to act as a portfolio project host, a place where I can showcase my personal photography projects and music creations as a DJ. Astro appealed to me because of its performance, flexibility and the ability to incorporate React components into a static site.\n\n## Why Astro?\n\nAstro is a static site builder that is designed to bring modern web development to static sites. It allows developers to use React components, Sass, and other modern web development tools to create fast, responsive sites. Additionally, it provides features like code splitting, prefetching, and lazy loading, which helps to improve site performance.\n\nOne of the major benefits of using Astro is the ability to create dynamic, interactive components that can be reused throughout the site. This is particularly useful when building a portfolio site, as it allows for the easy creation of custom components to showcase projects.\n\n## Creating My Site\n\nThe first step in creating my site was to set up a basic Astro project structure. This involved creating a new Astro project and configuring the project settings to my preferences. I chose to use Sass for styling, and also set up a few basic site pages, including a homepage and pages for my photography and music projects.\n\nFor my photography page, I created a custom component to display my portfolio of photos. I used the Masonry layout library to create a dynamic grid layout that would adapt to different screen sizes. Additionally, I incorporated a lightbox plugin to allow visitors to view larger versions of the photos.\n\nOn my music page, I created a custom component to showcase my DJ mixes. I used the Howler.js library to create a custom audio player that would allow visitors to play and pause the music. Additionally, I created custom artwork for each mix and incorporated it into the player.\n\n## Deploying My Site\n\nOnce my site was complete, I needed to deploy it to a hosting service. I chose to use Vercel, a popular site hosting service that provides easy deployment and continuous integration, and serverless functions for advanced site features.\n\nTo deploy my site, I first connected my Git repository to Vercel. I then configured the deployment settings to build my Astro site and deploy it to a custom domain. Vercel also provided features like HTTPS support, automatic builds, and CDNs to improve site performance.\n\n## Conclusion\n\nCreating my own website with Astro was a fun and rewarding experience. Astro's flexibility and use of modern web development tools allowed me to create a fast, responsive site that showcases my personal projects. Additionally, deploying my site to Vercel was quick and easy, allowing me to share my work with others.\n\nIf you're a software engineer looking to create a portfolio site or showcase personal projects, I highly recommend giving Astro a try. Its use of React components and modern web development tools makes it a great choice for creating dynamic, interactive sites.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"why-astro","text":"Why Astro?"},{"depth":2,"slug":"creating-my-site","text":"Creating My Site"},{"depth":2,"slug":"deploying-my-site","text":"Deploying My Site"},{"depth":2,"slug":"conclusion","text":"Conclusion"}];
				}
				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return createVNode($$BlogPostLayout, {
									file,
									url,
									content,
									frontmatter: content,
									headings: getHeadings(),
									rawContent,
									compiledContent,
									'server:root': true,
									children: contentFragment
								});
				}
				Content[Symbol.for('astro.needsHeadRendering')] = false;

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	images,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://rbclair.me");
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Blog;
  const allPosts = await Astro2.glob(/* #__PURE__ */ Object.assign({"./posts/personal-website-with-astro.md": () => Promise.resolve().then(() => _page5)}), () => "../pages/posts/*.md");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog", "class": "astro-IJNERLR2" }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead($$result2)}<h1 class="astro-IJNERLR2">Blog Archive</h1>
	<main class="astro-IJNERLR2">
		<div class="content astro-IJNERLR2">

			<ul class="astro-IJNERLR2">
				${allPosts.map((post) => renderTemplate`<li class="astro-IJNERLR2"><a${addAttribute(post.url, "href")} class="astro-IJNERLR2">${post.frontmatter.title}</a></li>`)}
			</ul>
		</div>
	</main>
` })}`;
}, "C:/Devel/projects/web/heliasar/src/pages/blog.astro");

const $$file = "C:/Devel/projects/web/heliasar/src/pages/blog.astro";
const $$url = "/blog";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Blog,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, _page1 as a, _page2 as b, _page3 as c, _page4 as d, _page5 as e, _page6 as f };
