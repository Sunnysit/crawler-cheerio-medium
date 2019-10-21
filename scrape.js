const request = require('request');
const cheerio = require('cheerio');



exports.fetchArticle = () => 

  new Promise((resolve,reject)=>{
    const data = [];
    request('https://medium.com/tag/javascript', (error, response, html) => {
      if(error) return reject(error);
      if(response.statusCode === 200)
      {
        const $ = cheerio.load(html);
  
        $('.postArticle').each((i, el) => {
          const title = $(el)
            .find('.graf--title')
            .text();
          
          const description = $(el).find('.graf--trailing').text();

          const link = $(el).find('.postArticle-content').parent().attr('href');
  
          const author = $(el).find('.postMetaInline').find('[data-action=show-user-card]').text();
  
          const date = $(el).find('time').text();
  
          const readingTime = $(el).find('.readingTime').attr('title');

          const imgURL = $(el).find('.graf-image').attr('src');

          data.push({
            title,
            description,
            link,
            author,
            date,
            readingTime,
            imgURL
          })
  
        });
  
        // console.log(data);
        resolve(data);
      }else{
        reject(response);
      }
 
    });
  });

  
  exports.fetchArticleWithQuery = (query) => 
  
    new Promise((resolve,reject)=>{
      const data = [];
      request('https://medium.com/tag/'+query, (error, response, html) => {
        if(error) return reject(error);
        if(response.statusCode === 200)
        {
          const $ = cheerio.load(html);
    
          $('.postArticle').each((i, el) => {
            const title = $(el)
              .find('.graf--title')
              .text();
            
            const description = $(el).find('.graf--trailing').text();
  
            const link = $(el).find('.postArticle-content').parent().attr('href');
    
            const author = $(el).find('.postMetaInline').find('[data-action=show-user-card]').text();
    
            const date = $(el).find('time').text();
    
            const readingTime = $(el).find('.readingTime').attr('title');
  
            const imgURL = $(el).find('.graf-image').attr('src');
    
            data.push({
              title,
              description,
              link,
              author,
              date,
              readingTime,
              imgURL
            })
    
          });
    
          // console.log(data);
          resolve(data);
        }else{
          reject(response);
        }
   
      });
    });
  
  