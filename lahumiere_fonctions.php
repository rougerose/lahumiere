<?php

if (!defined("_ECRIRE_INC_VERSION")) return;

function array_merge5($array1, $array2) {
   return array_merge((array)$array1,(array)$array2);
}

// Pour le calendrier, decale l'annee de la date. Sur la base du filtre Agenda_moisdecal du plugin Agenda
function Agenda_anneedecal($date,$decalage,$format){
   include_spip('inc/filtres');
   $date_array = recup_date($date);
   if ($date_array) list($annee, $mois, $jour) = $date_array;
   if (!$jour) $jour=1;
   if (!$mois) $mois=1;
   $annee2 = $annee + $decalage;
   $date2 = mktime(1, 1, 1, $mois, $jour, $annee2);
   // mois normalement attendu
   $annee2 = date('Y',$date2);
   return date($format, $date2);
}

/*
 * Fonction prenom_nom()
 *
 * Auteur : François Schreuer <francois@schreuer.org>
 * http://francois.schreuer.org/
 *
 * Copyright : GNU Public Licence
 *
 * Si le nom ET le prénom sont présents, on les renvoie concaténés et
 * séparés par un espace insécable, le nom étant passé en majuscules
 *
 * Dans le cas contraire (soit dans le cas où au moins des deux éléments
 * est vide), on renvoie les deux d'un coup (et celui qui n'est pas vide
 * sera affiché). Et s'ils sont tous les deux vides, on renverra du vide,
 * comme il est de bon ton dans ce genre de situation.
 *
 */
function prenom_nom($texte) {
   if(strstr(preg_replace("(@-|@-|@ |@)","",$texte),"*")) {
      if(prenom($texte) && nom($texte))
         return prenom($texte)."&nbsp;".nom($texte);
      else
         return prenom($texte).nom($texte);
   }
   else
      return $texte;
}

/*
 * Fonction prenom_nom()
 *
 * Auteur : François Schreuer <francois@schreuer.org>
 * http://francois.schreuer.org/
 *
 * Copyright : GNU Public Licence
 *
 * Cette fonction :
 * - enlève le signe distinctif des secrétaires de rédaction;
 * - renvoie le prénom après l'avoir passé en minuscules et
 *   avoir passé l'initiale en majuscules.
 *
 */
 function prenom($texte) {
    $texte = preg_replace("(@-|@-|@ |@)","",$texte);
    if(strstr($texte,"*")) {
       if($prenom = trim(preg_replace('/^(.*)\*(.*)/i','$2',$texte))) {
          return trim($prenom);
       }
       else {
          if(substr($texte,0,1) == "*")
          return trim($texte);
          else
             return "";
       }
    }
    else
       return "";
 }

/*
 * Fonction nom()
 *
 * Auteur : François Schreuer <francois@schreuer.org>
 * http://francois.schreuer.org/
 *
 * Copyright : GNU Public Licence
 *
 * Cette fonction :
 * - enlève le signe distinctif des secrétaires de rédaction;
 * - renvoie le nom après l'avoir passé en minuscules et
 *   avoir passé l'initiale en majuscules
 *
 */
 function nom($texte) {
    $texte = preg_replace("(@-|@-|@ |@)","",$texte);
    if(strstr($texte,"*")) {
       if($nom = trim(preg_replace('/^(.*)\*(.*)/i','$1',$texte))) {
          return trim($nom);
       }
       else {
          if(substr($texte,0,1) == "*")
          return "";
          else
             return trim($texte);
       }
    }
    else {
       return $texte;
    }
 }

/*
 * Fonction harmonise_noms()
 *
 * Auteur : François Schreuer <francois@schreuer.org>
 *
 * Copyright : GNU Public Licence
 *
 * Harmonise le format de l'affichage des noms.
 *
 * Vous pouvez changer facilement le modèle qui vous convient
 * en activant la ligne adéquate.
 *
 */
function harmonise_noms($texte) {
   // Ne fait rien
   return trim($texte);
}

/*
 * Fonction ucfirst_fr()
 *
 * Auteur : François Schreuer <francois@schreuer.org>
 *
 * Copyright : GNU Public Licence
 *
 * Transforme la première lettre d'une chaîne en majuscule
 * en traitant aussi les caractères accentués. Il s'agit
 * donc d'une version améliorée de ucfirst_fr()
 *
 * NB : Cette fonction a besoin de la fonction majuscules()
 * de SPIP
 *
 */
function ucfirst_fr($chaine) {
   return majuscules(substr($chaine,0,1)).substr($chaine,1);
}

/*
 * Autre écriture possible pour ucwords_amelioree() (nettement
 * plus jolie mais il faut encore implémenter dedans le
 * traitement des caractères français) :
*/
function ucwords_amelioree($texte) {
  return ucwords(preg_replace_callback('`(\w+)(-)(\w+)`','mot_compose',$texte));
}

// Sous-fonction de la précédente
function mot_compose($match){
   return $match[1].$match[2].ucfirst($match[3]);
}

?>