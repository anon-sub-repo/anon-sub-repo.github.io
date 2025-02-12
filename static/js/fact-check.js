var strings = [
    "Parsing frame-semantics...",
    "Finding congress member...",
    "Checking bills...",
    "Collecting votes...",
    "Comparing votes with claim..."
];

var index = 0;
var intervalId = null;

function submitForm() {
    $('#results-container').empty();
    $('#loader').show();
    cycleLoading();

    const userInput = document.getElementById("input-text").value;
    if (userInput === "") {
        alert("Please input a claim to check!");
        return;
    }

    //  Create AJAX call to send user input to server
    $.ajax({
        type: "GET",
        url: "https://anon-proxy.azurewebsites.net/proxy/submit",
        data: { query: userInput },
        success: function (response) {
            document.getElementById("results-container").innerHTML = response;
            $("html,body").animate(
                {
                    scrollTop: $("#input-text").offset().top,
                },
                "slow"
            );

            var popupArgs = {
                inline: true,
                hoverable: true,
                position: "top center",
                delay: {
                    show: 0,
                    hide: 100,
                },
            };
            
            // .fe-agent, .fe-issue, .fe-side, .fe-position, .fe-frequency, .fe-time, .fe-place, .fe-support_rate
            $('.fe-agent').popup({...popupArgs, target: '.fe-agent'});
            $('.fe-issue').popup({...popupArgs, target: '.fe-issue'});
            $('.fe-side').popup({...popupArgs, target: '.fe-side'});
            $('.fe-position').popup({...popupArgs, target: '.fe-position'});
            $('.fe-frequency').popup({...popupArgs, target: '.fe-frequency'});
            $('.fe-time').popup({...popupArgs, target: '.fe-time'});
            $('.fe-place').popup({...popupArgs, target: '.fe-place'});
            $('.fe-support_rate').popup({...popupArgs, target: '.fe-support_rate'});

            $('.alignment').popup({
                inline: true,
                hoverable: true,
                position: 'left center',
                delay: {
                    show: 0,
                    hide: 300
                },
                // Fix overflow
                onShow: function () {
                    $('.results-column-description > .column > .ui.popup').css('width', '400px').css('max-height', '250px').css('overflow', 'hidden scroll');
                }
            });

            $('.alignment-text-label').popup({
                inline: true,
                hoverable: true,
                position: 'top center',
                delay: {
                    show: 0,
                    hide: 0
                }
            });

            $('#loader').hide();

        },
        error: function (error) {
            console.log(error);
        }
    });
}

function toggleSummary(e) {
    $(e).parent().find('.bill-summary').toggleClass('hide-long-text');
    if ($(e).text() == 'Show more') {
        $(e).text('Show less');
    } else {
        $(e).text('Show more');
    }
}

function cycleLoading() {
    // Reset the index
    index = 0;
    $("#loading-text").text("Loading...");

    // Clear the interval if it's already running
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    
    // Start a new interval
    intervalId = setInterval(function() {
        // Update the text of the div
        $("#loading-text").text(strings[index]);

        // Move to the next index
        index++;

        // Stop when all strings have been shown
        if (index >= strings.length) {
            clearInterval(intervalId);  // Stop the interval
            intervalId = null;  // Reset intervalId
            index = 0;  // Reset index
        }
    }, 1000);  // Change text every 1 second   
}
