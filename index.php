<!doctype html>
<html lang="fr">

	<head>
	  <meta charset="utf-8">
	  <title>Recherche de location des tweets à propos d'un sujet</title>
	  <link rel="stylesheet" href="lib/bootstrap/dist/css/bootstrap.min.css">
	  <link rel="stylesheet" href="style.css">
	  <script src="script.js"></script>
	</head>
	<body>
	<?php 
	// Start streaming
		require_once('FilterTrackConsumer.php');
		if(!empty($_POST["searchTweet"])){
			$sc = new FilterTrackConsumer(OAUTH_TOKEN, OAUTH_SECRET, Phirehose::METHOD_FILTER);
			$sc->setTrack(array('manger'));
			$sc->consume();
		}
	?>
	<div class="page">
		<div class="jumbotron"> 
			<h1>Bonjour, visiteur.</h1> 
			<p>Vous trouverez ici un formulaire pour rechercher du textes dans les tweets en temps réels.</p>   
		</div>
		<form method="post">
			<div class="row">
				<div class="col-lg-6">
					<div class="input-group">
					  <span class="input-group-btn">
						<button class="btn btn-default" type="submit">Go!</button>
					  </span>
					  <input name="searchTweet" type="text" class="form-control" placeholder="Recherche dans les tweets...">
					</div><!-- /input-group -->
				</div><!-- /.col-lg-6 -->
			</div><!-- /.row -->
		</form>
	</div>
	</body>
</html>