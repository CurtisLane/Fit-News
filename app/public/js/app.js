$(document).ready(function(){
    console.log('Ready!')

    /*====================================
        Global Variables
      ====================================*/
    let articleArr = []

    /*====================================
        Event Handlers
      ====================================*/

    $(document).on('click', '#scrapeBtn', function(){
        getArticles()
    })

    /*====================================
        Function Definitions
      ====================================*/

    function populateArticleDiv(){
        if (articleArr.length){
            $('#articleDiv').empty()
            renderArticles()
            renderApiLinks()
        } else {
            $('#articleDiv').empty()
            renderScrapeButton()
        }
    }

    function renderScrapeButton(){
        let scrapeBtnDiv = $('<div>').addClass('mx-auto my-4 text-center')
        let scrapeBtn = $('<button>').text('Get Articles')
        scrapeBtn.addClass('btn btn-secondary mx-auto')
        scrapeBtn.attr('id', 'scrapeBtn')

        scrapeBtnDiv.append(scrapeBtn)
        $('#articleDiv').append(scrapeBtnDiv)
    }

    function getArticles(){
        $.getJSON('/api/articles',function(data){
            if (data.length){
                articleArr.push(data)
                populateArticleDiv()
            } else {
                $.ajax({
                    method: "GET",
                    url: '/api/scrape'
                }).then(function(data){
                    getArticles()
                }).catch(function(err){
                    console.log(err)
                })
            }
        })
    }

    function renderArticles(){
        console.log(articleArr)
        for (let i=0; i<articleArr.length; i++){
            let id = articleArr[i]._id
            let headline = articleArr[i].headline
            let summary = articleArr[i].summary
            let url = articleArr[i].URL
            let img = articleArr[i].image
        }
    }

    function singleArticle(){

    }

    function renderApiLinks(){

    }
    /*====================================
        Function Calls
      ====================================*/

    populateArticleDiv()

    



})