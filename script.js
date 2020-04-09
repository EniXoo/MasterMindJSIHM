var MasterMind = {
    nom: 'MasterMind',

    parametres: {
        lines: 10, // Lignes disponibles avant de perdre = Nombre d'essai pour trouver la combinaison secrète
        colonnes: 4, // Colonnes disponible = Longueur de la combinaison
        nbCouleurs: 6, // Nombre de couleurs disponible (Cf. Mastermind.couleurs || this.couleurs)
        doublons: 0,
    },

    jeu: {
        tour: 0, // Tour actuel, sert de comparaison avec this.parametres.lines || Incrémentation après validation de la sélection
        colonne: 0, // Colonne utilisé actuellement
        selection: [], // Combinaison proposée par le joueur
        combinaisonSecrete: [], // Combinaison à deviner pour remporter la partie, générer ci-dessous
    },

    initialisation() {
        this.reset();
    },

    defineCombinaisonSecrete() { // Méthode définissant une combinaisonSecrete ( Pas si secrète que ça pour les malins (: )
        var verif;
        for (i = 0; i < this.parametres.colonnes; i++) { // Boucle : Longueur de la combinaison
            // On ajoute à la liste this.jeu.combinaisonSecrete un double compris entre 0 et 1 multiplié par le nombre de couleurs disponible
            // +1 car this.couleurs commence à 1
            if (this.parametres.doublons == 1) {
                this.jeu.combinaisonSecrete.push(parseInt(Math.random() * this.parametres.nbCouleurs) + 1);
            }
            else {// si il ne peut y avoir de doublons, on vérifie cela ici
                isInserted = false;
                while (!isInserted) {
                    verif = parseInt((Math.random() * this.parametres.nbCouleurs) + 1);
                    if ((this.jeu.combinaisonSecrete).includes(verif) == false) {//Si on essaye d'ajouter une couleur déjà présente alors on essaye de nouveau en générant une autre couleur
                        this.jeu.combinaisonSecrete.push(verif);
                        isInserted = true;
                    }
                }
            }
        }
    },

    getColor(choix) {//permet de placer la bille dans la prochaine div vide de bas en haut de gauche a droite
        if (this.jeu.colonne < this.parametres.colonnes) {
            ((this.jeu).selection)[this.jeu.colonne] = choix;
            this.addColor(choix);
        }
        else {
            alert("Vous ne pouvez pas placer plus de " + this.parametres.colonnes + " couleurs");//si la ligne actuelle contient deja 4 billes on renvoie une alerte
        }
    },

    addColor(choix) {
        var nomId = 'dot-';// ici pas moyen d'écrire directement la string obligé de passer par des concaténations successives, pas très pratique mais fonctionnel.                               
        var nomSelecAlt = nomId;// de plus sommes incapable de trouver l'origine de cette erreur.
        nomId += this.parametres.lines - this.jeu.tour;
        nomSelecAlt += this.parametres.lines - this.jeu.tour - 1;
        nomId += '-';
        nomSelecAlt += '-';
        var nomSelec = nomId;
        nomSelecAlt += 1;
        nomSelec += this.jeu.colonne + 2;
        nomId += this.jeu.colonne + 1;
        if (choix == 0) { // Sert pour réinitialiser la dernière case, appelé par clearLast() qui s'occupe des vérifications
            var nomClasse = 'dot'
            if (this.jeu.colonne == this.parametres.colonnes - 1) {//Si l'on supprime la dernière bille de la ligne
                document.getElementById(nomId).className = (nomClasse + " pionSelected");//On supprime la dernière bille et on déplace le curseur
                document.getElementById("choices").className = '';//On retire le curseur autour du bouton de sélection/supression
            }
            else {// SI on supprime une bille qui n'est pas en dernière position de la ligne
                document.getElementById(nomId).className = (nomClasse + " pionSelected");//On déplace le curseur
                document.getElementById(nomSelec).className = ("dot");//On supprime la bille
            }
        }
        else {// On ajoute une bille 
            var nomClasse = 'dot dot';
            nomClasse += choix;
            document.getElementById(nomId).className = nomClasse;//On place une bille de la bonne couleur dans l'emplacement courant
            this.jeu.colonne += 1;
            if (this.jeu.colonne < this.parametres.colonnes) {//Si la bille que l'on place n'est pas la dernière de la ligne
                document.getElementById(nomSelec).className = (document.getElementById(nomSelec).className + " pionSelected");// On déplace le curseur d'emplacement
            }
            if (this.jeu.colonne == this.parametres.colonnes) {//Si la bille est la dernière de la ligne
                document.getElementById("choices").className = (document.getElementById("choices").className + " pionSelected")//On place le curseur autour des boutons de validation/suppression
            }
        }
    },

    clearLast() {
        if (this.jeu.colonne != 0) { // Si ligne pas vide
            this.jeu.selection.pop(); // On enlève le dernier élément de la liste selection
            this.jeu.colonne = this.jeu.colonne - 1;//la colonne active est donc la précédente
            this.addColor(0);
        }
    },

    checkProposition() {
        if (this.jeu.colonne != this.parametres.colonnes) { // Si champs de proposition incomplet
            alert("Il manque des couleurs");
        }
        else {
            if (JSON.stringify(this.jeu.combinaisonSecrete) == JSON.stringify(this.jeu.selection)) { // Comparaison de la proposition et de la combinaison secrète
                alert("Vous avez gagné en "+(this.jeu.tour+1)+" coups ! Une nouvelle partie va commencer.");
                this.reset();
            }
            else if (this.jeu.tour == this.parametres.lines - 1) {// Si plus d'essais
                alert("Vous avez perdu, une nouvelle partie va commencer");
                this.reset();
            }
            else {
                // Sinon 
                compteur = 1;
                temp = this.jeu.combinaisonSecrete.slice(0);
                for (i = 0; i < this.parametres.colonnes; i++) {
                    // On vérifie les billes biens placés
                    if (this.jeu.combinaisonSecrete[i] == this.jeu.selection[i]) {
                        var nomHint = 'hint-';
                        nomHint += this.parametres.lines - this.jeu.tour;
                        nomHint += '-';
                        nomHint += compteur;
                        document.getElementById(nomHint).className = 'dot hint hintOk';
                        temp[i] = 0;
                        this.jeu.selection[i] = -1; // Servira de blocage à la fonction indexOf()
                        compteur++;
                    }
                }// puis les billes de la bonne couleur mais mal placées
                for (var j = 0; j < temp.length; j++) {
                    if (temp.indexOf(this.jeu.selection[j]) !== -1) {
                        var nomHint = 'hint-';
                        nomHint += this.parametres.lines - this.jeu.tour;
                        nomHint += '-';
                        nomHint += compteur;
                        document.getElementById(nomHint).className = 'dot hint hintNearly';
                        temp[temp.indexOf(this.jeu.selection[j])] = 0;
                        compteur++;
                    }
                }

                //Enfin on passe au tour suivant
                this.jeu.tour += 1;
                this.jeu.colonne = 0;


                var Nom = 'dot-';
                Nom += this.parametres.lines - this.jeu.tour;
                Nom += "-";
                Nom += this.jeu.colonne + 1;
                document.getElementById("choices").className = '';//On retire le sélecteur au niveau des boutons de validation/suppression
                document.getElementById(Nom).className = (document.getElementById(Nom
                ).className + " pionSelected");//On redessine le sélecteur sur la ligne suivante en premlière position
            }
        }
    },

    recupererParametres() {// On récupère toutes les valeurs des paramètres et on redémarre la partie.
        this.getParameterColonne();
        this.getParameterCouleur();
        this.getParameterLigne();
        this.getParameterDoublon(); // Dû a un bug qui a lieu lorsque le nombre de colonnes dépasse le nombre de couleurs disponibles lorsque les doublons sont désactivés,
        this.reset(); // on appelle TOUJOURS getParameterDoublon après les autres sans quoi on risque une boucle infinie dans defineCombinaisonSecrete.
    },

    reset() {//On remet tout les attributs à leur valeur d'origine, on définit une nouvelle combinaison secrète et on redessine la grille de jeu.
        this.jeu.tour = 0;
        this.jeu.colonne = 0;
        this.jeu.selection = [];
        this.jeu.combinaisonSecrete = [];
        this.defineCombinaisonSecrete();
        this.drawGameBoard();
    },

    drawGameBoard() {//dessine la grille de jeu et les pions à ajouter
        this.drawGrid();
        this.drawColorSelection();
    },

    drawGrid() {
        document.getElementById('dot-container').innerHTML = "";
        for (i = 1; i <= this.parametres.lines; i++) {//nb de lignes
            var line = document.createElement('div');
            var addHere = document.getElementById('dot-container');
            line.className = "ligne" + i;
            line.id = "ligne-" + i;
            addHere.appendChild(line);
            for (j = 1; j <= this.parametres.colonnes; j++) {//nb de colonnes pour les emplacements
                var cell = document.createElement('div');
                var addHere2 = document.getElementById("ligne-" + i);
                if (i == this.parametres.lines && j == 1) {
                    cell.className = "dot pionSelected";
                }
                else {
                    cell.className = "dot";
                }
                cell.id = "dot-" + i + "-" + j;
                addHere2.appendChild(cell);
            }
            for (j = 1; j <= this.parametres.colonnes; j++) {//nb de colonnes pour les indices
                var hint = document.createElement('div');
                var addHere2 = document.getElementById("ligne-" + i);
                hint.className = "dot hint";
                hint.id = "hint-" + i + "-" + j;
                addHere2.appendChild(hint);
            }
        }
    },

    drawColorSelection() {
        document.getElementById('choice-container').innerHTML = "";
        for (i = 1; i <= this.parametres.nbCouleurs; i++) {//nb de couleurs disponibles
            var br = document.createElement('br');
            var el = document.createElement('div');
            var addHere = document.getElementById('choice-container');
            el.id = "dot-" + i;
            el.className = "dot dot" + i;
            el.setAttribute('onclick', this.nom + '.getColor(' + i + ');');
            addHere.appendChild(el);
            if (i == 4)
                addHere.appendChild(br);
        }
    },

    getParameterColonne() {
        this.parametres.colonnes = parseInt(document.getElementById('paramColonne').value);//récupérer le  paramètre colonne

    },

    getParameterLigne() {
        this.parametres.lines = parseInt(document.getElementById('paramLigne').value);//récupérer le  paramètre ligne
    },

    getParameterCouleur() {
        this.parametres.nbCouleurs = parseInt(document.getElementById('paramCouleur').value);//récupérer le  paramètre nb de couleurs
    },

    getParameterDoublon() {//récupérer le  paramètre booléen Doublon
        if (document.getElementById('doublonTrue').checked == true) {
            this.parametres.doublons = parseInt(document.getElementById('doublonTrue').value);//actualiser la variable
        }
        else {
            this.parametres.doublons = 0;
        }
        if (this.parametres.colonnes > this.parametres.nbCouleurs) {//Contrôle de sécurité permettant de ne jamais avoir la situation NbCouleur<NbColonne sans les doublons d'actifs
            this.parametres.doublons = 1;// car dans ce cas il est impossible de générer une combinaison secrète qui remplit ces contraintes,
            document.getElementById('doublonTrue').checked = true;//  donc on force les doublons et on actualise l'affichage du paramètre.

        }
    },

}