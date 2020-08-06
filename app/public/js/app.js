$(document).ready(function(){
    console.log('Ready!')

    /*====================================
        Global Variables
      ====================================*/
    let articleArr = []
    let commentArr = []
    /*====================================
        Event Handlers
      ====================================*/

    $(document).on('click', '#scrapeBtn', function(){
        getArticles()
    })

    $(document).on('click', '#articleCard', function(){
        let cardId = $(this).attr('data-id')
        singleArticle(cardId)
    })

    $(document).on('click', '#addCommentBtn', function(){

        $('#commentModal').attr('data-id', )
        $('#commentModal').modal('show')
    })

    $(document).on('click', '#commentSubmit', function(){
        let articleIdComment = $('#commentModal').attr('data-id')
        let commentBody = $('#commentBody').val().trim()

        $.post('/api/articles/' + articleIdComment, {comment: commentBody}, function(data){
            console.log(data)
        })
        $('#commentModal').modal('toggle')
        $('#commentBody').val('')
        singleArticle(articleIdComment)
    })

    $(document).on('click', '#commentDeleteBtn', function(){
        let deleteCommentId = $(this).attr('data-id')
        let articleId = $(this).attr('data-article-id')

        $.get('/api/comment/' + deleteCommentId, function(data){
            console.log(data)
        })
        singleArticle(articleId)
    })

    /*====================================
        Function Definitions
      ====================================*/

    function populateArticleDiv(){
        renderAddCommentBtn()

        if (articleArr.length){
            renderArticles()
        } else {
            $('#articleDiv').empty()
            renderScrapeButton()
        }
    }

    function renderScrapeButton(){
        let scrapeBtnDiv = $('<div>').addClass('mx-auto my-4')
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

    function getOneArticle(cardId){
        $.getJSON('/api/articles/' + cardId, function(data){
            console.log(data)
            articleArr.push(data)
            populateArticleDiv()
        })
    }

    function renderArticles(){
        $('#articleDiv').empty()
        $('#commentDiv').empty()
        $('#small').text('Select a single post to add comments!')
        for (let i=0; i<articleArr.length; i++){
            
            let comments = articleArr[i].comments
            let id = articleArr[i]._id
            let headline = articleArr[i].headline
            let summary = articleArr[i].summary
            let url = articleArr[i].URL
            let img = articleArr[i].image 
            
            // load comments only on single posts
            if (articleArr.length === 1 && comments.length >= 1){
                commentArr = comments
                console.log(commentArr)

                for (let j = 0; j < commentArr.length; j++){
                    let commentId = commentArr[j]._id
                    let commentText = commentArr[j].comment

                    console.log(commentId)
                    console.log(commentText)

                    let commentCard = $('<div>')
                    .addClass('card text-dark my-4')
                    .attr('data-id', commentId)
                    let commentCardBody = $('<div>')
                    .addClass('card-body')
                    let commentCardText = $('<p>')
                    .addClass('card-text')
                    .text(commentText)
                    let commentDelete = $('<button>')
                    .addClass('btn btn-danger')
                    .attr('id', 'commentDeleteBtn')
                    .attr('data-id', commentId)
                    .attr('data-article-id', id)
                    .text('Delete')

                    commentCardBody.append(commentCardText, commentDelete)
                    commentCard.append(commentCardBody)
                    $('#commentDiv').append(commentCard)

                }
            }

            // Build bootstrap card with article data
            let card = $('<div>')
            .addClass('card text-dark my-4')
            .attr('data-id', id)
            .attr('id', 'articleCard')
            let cardImg = $('<img>')
            .addClass('car-img-top')
            .css('width', '100%')
            .css('height', '50%')
            .attr('src', img)
            let cardBody = $('<div>')
            .addClass('card-body')
            let cardTitle = $('<h5>')
            .addClass('card-title')
            .text(headline)            
            let cardText = $('<p>')
            .addClass('card-text')
            .text(summary)
            let cardBtn = $('<a>')
            .addClass('btn btn-secondary')
            .attr('href', url)
            .text('Visit Site')

            // append card together and add to page
            cardBody.append(cardTitle, cardText, cardBtn)
            card.append(cardImg, cardBody)
            $('#articleDiv').append(card)
        }
    }

    function singleArticle(cardId){
        $('#articleDiv').empty()
        articleArr = []
        getOneArticle(cardId)
        $('#commentModal').attr('data-id', cardId)
    }

    function renderAddCommentBtn(){
        if (articleArr.length === 1){
            $('#addCommentBtn').show()
        } else {
            $('#addCommentBtn').hide()
        }
    }

    /*====================================
        Function Calls
      ====================================*/

    populateArticleDiv()

})