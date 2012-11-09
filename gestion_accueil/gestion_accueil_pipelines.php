<?php
	function gestion_accueil_ajouter_boutons($boutons_admin) {
		// si on est admin
		if ($GLOBALS['connect_statut'] == "0minirezo") {
		  // on voit le bouton comme  sous-menu de "naviguer"
			$boutons_admin['naviguer']->sousmenu['cfg&cfg=gestion_accueil_fr']= new Bouton("plugin-24.gif", _T('Gestion Accueil') );
		}
		return $boutons_admin;
	}
	
?>
