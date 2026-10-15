setInterval(() => {
    document.querySelectorAll('#in_game_ad_right, .adsbyvli,#main_page_ad_right_top, .in_game_ad_bottom, .in_game_ad_bottom_small, .quantcast-ad-div, #in_game_ad_left_slot, #in_game_ad_left, .in_game_ad_left').forEach((element) => {
        element.style.display = 'none'
    })
}, 1000)
