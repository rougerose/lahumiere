# Dépendances
## plugin mll
- surcharge (fichier vide) de mll_styles.css
- surcharge de formulaires/menu_lang.html

# Notes pour la documentation
- Ne pas faire d'article uniquement avec un descriptif et sans contenu #TEXTE => page article vide.
- De plus, le descriptif ne doit pas contenir de liens, sinon cela casse le code html sur la page d'accueil et la page exposition (un `<a href>` ne peut contenir un autre `<a href>`).
- Ne pas oublier d'utiliser `<multi></multi>` dans les légendes des images.
- Les images n'ont pas besoin d'être importés deux fois.
- Rubrique Plaisirs : un seul article par artiste (et autant d'images que nécessaire par article). Compte tenu du fait qu'il n'y a pas de texte, il est inutile de créer une traduction pour chaque article (comme c'est le cas pour la rubrique Artiste). Si l'on souhaite ajouter du texte dans un article, alors il faut utiliser les balises `<multi></multi>`.
- Rubrique Publications : proposition de déplacer les images dans la rubrique...

## Rubrique Galerie
Aucun article nécessaire :
- Le texte de présentation est le champs TEXTE de la rubrique. Texte en version `<multi>`, idem pour le Descriptif.
- Le champs Descriptif correspond au texte court de présentation de la Galerie présent dans le pied de chaque page.
- Les images sont celles associées à la rubrique. Penser aux légendes en `<multi>` si nécessaire.

# Mise à jour du site
- Config/rubriques : activer le descriptif (pour la rubrique Galerie).
- Déplacer rubrique Estampes dans Galerie et renommer en "plaisirs d'Anne"

# Todo
- partager un article Twitter + Facebook
- document_portfolio : revoir les largeurs de vignette nécessaires compte tenu du fait que le portfolio est contenu dans la même largeur que le texte (donc plus réduit que la version maquette).
- adapter le backend notamment en fonction des sélections de page d'accueil et d'expositions
- CSS print
- favicon
