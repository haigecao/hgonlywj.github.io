define(["avalon", "text!./aaa.html"], function(avalon, aaa) {

    avalon.templateCache.aaa = aaa
    avalon.define({
        $id: "aaa",
<<<<<<< HEAD
        username: "司徒正美"
=======
        username: "hgonlywj"
>>>>>>> 33df3aafe37103172ef184589454c2bf0629cc71
    })
    avalon.vmodels.root.page = "aaa"
      
})
