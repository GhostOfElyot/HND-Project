<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="utf-8">
		<title></title>
		<link rel="stylesheet" href="/prod/stylesheets/stylesheet.css">
	</head>
	<body>

		<?php
			include("include/menu.php");
		?>

		<canvas id="canvas"></canvas>

		<div id="tool-container">
			<div class="tool-button">
				<p class="tool-text" id="numberOfEnemies" style="color:white;">0</p>
			</div>
			<div class="tool-button" onclick="tool(0)">
				<p class="tool-text" style="color:white;">delete</p>
			</div>

			<div class="tool-button" onclick="tool(1)">
				<p class="tool-text" style="color:rgb(205, 0, 101);">wall</p>
			</div>

			<div class="tool-button" onclick="tool(2)">
				<p class="tool-text" style="color:rgb(0, 205, 156);">tower</p>
			</div>

			<div class="tool-button" onclick="tool(-1)">
				<p class="tool-text" style="color:rgb(22, 200, 25);">spawner</p>
			</div>
		</div>

		<script type="text/javascript" src="scripts/engine.js"></script>

		<script type="text/javascript" src="/prod/scripts/Tile.js"></script>
		<script type="text/javascript" src="/prod/scripts/Grid.js"></script>
		<script type="text/javascript" src="/prod/scripts/Enemy.js"></script>
		<script type="text/javascript" src="/prod/scripts/Tower.js"></script>

		<script type="text/javascript" src="/prod/scripts/game.js"></script>


	</body>
</html>
