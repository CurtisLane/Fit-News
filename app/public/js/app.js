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
            renderArticles()
            renderApiLinks()
        } else {
            $('#articleDiv').empty()
            renderScrapeButton()
        }
    }

    function renderScrapeButton(){
        let scrapeBtnDiv = $('<div>').addClass('mx-auto my-4 text-left')
        let scrapeBtn = $('<button>').text('Get Articles')
        scrapeBtn.addClass('btn btn-secondary mx-auto')
        scrapeBtn.attr('id', 'scrapeBtn')

        scrapeBtnDiv.append(scrapeBtn)
        $('#articleDiv').append(scrapeBtnDiv)
    }

    function getArticles(){
        $.getJSON('/api/articles',function(data){
            if (data.length){
                articleArr = data
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
        $('#articleDiv').empty()

        for (let i=0; i<articleArr.length; i++){


            let id = articleArr[i]._id
            let headline = articleArr[i].headline
            let summary = articleArr[i].summary
            let url = articleArr[i].URL
            let img = articleArr[i].image
            

            let card = $('<div>').addClass('card text-dark my-4')
            card.attr('data-id', id)
            let cardImg = $('<img>').addClass('car-img-top')
            cardImg.css('width', '100%')
            cardImg.css('height', 'auto')
            cardImg.attr('src', img)
            let cardBody = $('<div>').addClass('card-body')
            let cardTitle = $('<h5>').addClass('card-title')
            cardTitle.text(headline)            
            let cardText = $('<p>').addClass('card-text')
            cardText.text(summary)
            let cardBtn = $('<a>').addClass('btn btn-secondary')
            cardBtn.attr('href', url)
            cardBtn.text('Visit Site')

            cardBody.append(cardTitle, cardText, cardBtn)
            card.append(cardImg, cardBody)
            $('#articleDiv').append(card)
        }
    }

    function singleArticle(){
        $('#articleDiv').empty()


    }

    function renderApiLinks(){

    }
    /*====================================
        Function Calls
      ====================================*/

    populateArticleDiv()

    



})