import { createSignal } from "solid-js";

import "./NavBar.scss";

function NavBar() {
	const [toggleOpen, setToggleOpen] = createSignal(false);
	const isToggleOpen = () =>
		toggleOpen() ? "navbar-toggle active" : "navbar-toggle";

	const navBarLinksClass = () =>
		toggleOpen() ? "navbar-links active" : "navbar-links";

	return (
		<nav class="navbar">
			<div class="navbar-logo">
				{/* <a href="#">Logo</a> */}
				<h1>
					<span class="text-gradient">Rebecca Clair</span>
				</h1>
			</div>
			<ul class={navBarLinksClass()}>
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/projects">Projects</a>
				</li>
				<li>
					<a href="/photography">Photography</a>
				</li>
				<li>
					<a href="/music">Music</a>
				</li>
				<li>
					<a href="/blog">Blog</a>
				</li>
			</ul>
			<div class={isToggleOpen()} onClick={() => setToggleOpen(!toggleOpen())}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</nav>
	);
}

export default NavBar;
