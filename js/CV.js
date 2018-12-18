$.getJSON('js/cv.json',function (cvData) {
    var cv = new RI('CV');
    var competencesData = cvData.competences;
    var experiencesData = cvData.experiences;
    var formationsData = cvData.formations;
    var typeCompData = cvData.typeComp;
    var typeNiveauData = cvData.typeNiveau;

    var mois = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre"
    ];
    var competences = new Section('Competences');
    var experiences = new Section('Experiences');
    var formations = new Section('Formations');
    var groupeComp = null;
    var poste = null;
    var formation = null;
    var duree = "";

    for (var type in competencesData){
        groupeComp = new Category(competencesData[type][0].type);

        competencesData[type].forEach(function (competence) {
            groupeComp.add(new Item(competence.nom,''));
        });

        competences.add(groupeComp);
    }




    experiencesData.forEach(function (experience) {
        poste = new Category(experience._type +' '+ experience._poste);
        poste.add(new Item(experience._organisation));

        duree = "";
        duree = duree + 'Du ' + experience._debut['day']+' '+mois[experience._debut['month']-1]+' '+experience._debut['year']+' au ';
        duree = duree+experience._fin['day']+' '+mois[experience._fin['month']-1]+' '+experience._fin['year'];

        poste.add(new Item(duree));

        experiences.add(poste);
    });

    formationsData.forEach(function(formationData) {
        formation = new Category(formationData._nom);
        duree = "";
        formation.add(new Item(formationData._etablissement));
        if (formationData._fin == '0000-00-00') {
            duree = duree + 'Depuis ' + mois[formationData._debut['month'] - 1] + ' ' + formationData._debut['year'];
        } else {
            duree = duree + 'De ' + mois[formationData._debut['month'] - 1] + ' ' + formationData._debut['year'] + ' à ';
            duree = duree + mois[formationData._fin['month'] - 1] + ' ' + formationData._fin['year'];
        }
	formation.add(new Item(duree));
        if (formationData._commentaire != ""){
            formation.add(new Item(formationData._commentaire));
        }

        formations.add(formation);
    })

    cv.add(competences);
    cv.add(experiences);
    cv.add(formations);
    cv.build();
    console.log(cv);


    //console.log(experiences);
    //console.log(formations);
});
