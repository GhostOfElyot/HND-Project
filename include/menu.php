<div id="menu-container">
	<div class="menu-catagory-container">
		<h1 class="menu-catagory-header">Guides</h1>
		<ul class="menu-links">
			<li class="menu-link"><img src=".png" class="menu-link-glyph"><p class="menu-link-text">Begginer</li>
			<li class="menu-link"><img src=".png" class="menu-link-glyph"><p class="menu-link-text">Intermediate</li>
			<li class="menu-link"><img src=".png" class="menu-link-glyph"><p class="menu-link-text">Expert</li>
			<li class="menu-link"><img src=".png" class="menu-link-glyph"><p class="menu-link-text">Meta</li>

		</ul>
	</div>

	<div class="menu-catagory-container">
		<h1 class="menu-catagory-header">WIKI</h1>
		<ul class="menu-links">
			<li class="menu-link"><img src=".png" class="menu-link-glyph"><p class="menu-link-text">Towers</li>
			<li class="menu-link"><img src=".png" class="menu-link-glyph"><p class="menu-link-text">Enemies</li>
			<li class="menu-link"><img src=".png" class="menu-link-glyph"><p class="menu-link-text">Strategies</li>
			<li class="menu-link"><img src=".png" class="menu-link-glyph"><p class="menu-link-text">Lore</li>

		</ul>
	</div>

	<div class="menu-catagory-container">
		<h1 class="menu-catagory-header">Social</h1>
		<ul class="menu-links">
			<li class="menu-link"><img src="twitter.png" class="menu-link-glyph"><p class="menu-link-text">Twitter</li>
			<li class="menu-link"><img src="instagram.png" class="menu-link-glyph"><p class="menu-link-text">Instagram</li>
			<li class="menu-link"><img src="facebook.png" class="menu-link-glyph"><p class="menu-link-text">Facebook</li>
			<li class="menu-link"><img src="snapchat.png" class="menu-link-glyph"><p class="menu-link-text">Snapchat</li>
			<li class="menu-link"><img src="discord.png" class="menu-link-glyph"><p class="menu-link-text">Discord</li>
			<li class="menu-link"><img src="debo.png" class="menu-link-glyph"><p class="menu-link-text">DEBO</li>

		</ul>
	</div>

	<div class="menu-catagory-container">
		<h1 class="menu-catagory-header">About</h1>
		<ul class="menu-links">
			<li class="menu-link"><img src=".png" class="menu-link-glyph"><p class="menu-link-text">Project</li>
			<li class="menu-link"><img src=".png" class="menu-link-glyph"><p class="menu-link-text">elliome</li>
		</ul>
	</div>

</div>
<div id="menu-button" onclick="menu()">
	<div class="menu-button-element" id="menu-button-element-1"></div>
	<div class="menu-button-element" id="menu-button-element-2"></div>

</div>

<script type="text/javascript">
var menuBool = false;
function menu(){
	if (menuBool){
		document.getElementById("menu-container").style.top = "-100vh";
		document.getElementById("menu-button-element-1").style.transform = "rotate(0deg)";
		document.getElementById("menu-button-element-2").style.transform = "translate(0px,0px) rotate(0deg)";
		document.getElementById("menu-button-element-1").style.mixBlendMode = "difference";
		document.getElementById("menu-button-element-2").style.mixBlendMode = "difference";

	}
	else {
		document.getElementById("menu-container").style.top = "0vh";
		document.getElementById("menu-button-element-1").style.transform = "rotate(-60deg)";
		document.getElementById("menu-button-element-1").style.mixBlendMode = "normal";
		document.getElementById("menu-button-element-2").style.transform = "translate(-200%,0px) rotate(60deg)";
		document.getElementById("menu-button-element-2").style.mixBlendMode = "normal";

	}
	menuBool = !menuBool;
}

</script>
