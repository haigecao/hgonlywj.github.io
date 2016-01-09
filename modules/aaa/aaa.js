define(["avalon", "text!./aaa.html"], function(avalon, aaa) {

    avalon.templateCache.aaa = aaa
    avalon.define({
        $id: "aaa",
        username: "hgonlywj"
    })
    avalon.vmodels.root.page = "aaa"
      
})
