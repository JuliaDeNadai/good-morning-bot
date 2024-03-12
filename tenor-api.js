
import XMLHttpRequest from 'xhr2'

export async function search_images(search_term){
    return new Promise(async (resolve, reject) => {
        var apikey = process.env.TENOR_API_KEY;
        var clientkey = "my_test_app";
        var lmt = 1;
    
        var search_url = "https://tenor.googleapis.com/v2/search?q=" + search_term + "&key=" +
                apikey +"&client_key=" + clientkey +  "&limit=" + lmt;
    
        var xmlHttp = new XMLHttpRequest();
    
        xmlHttp.onreadystatechange = function()
        {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                
                let result = JSON.parse(xmlHttp.responseText);
    
                resolve(result["results"][0]["media_formats"]["gif"]["url"])
            }
        }
    
        xmlHttp.open("GET", search_url, true);
    
        xmlHttp.send(null);
    })
}
