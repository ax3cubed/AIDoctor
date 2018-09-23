// dependencies
var restify = require('restify');
var builder = require('botbuilder');
var natural = require('natural');
var request = require('request');
var oncotype = false;
var CIN = false;
var HPV = false;
var Colposcopy=false;
var Biopsy = false;
var Cytology = false;
var Schiller=false;

// Global Array
var record = ""

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});


// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// create the bot
var bot = new builder.UniversalBot(connector);

// Listen for messages from users
server.post('/diseasebot', connector.listen());

var bot = new builder.UniversalBot(connector, function(session){
      // Echo back users text
      var msg = "Would you like to now if you might have a diabetes disease, lung cancer or cervical cancer? Respond with 'diabetes', 'lung' or 'cervical' please";
      session.send(msg);
});

// diabetes
bot.dialog('diabetes', [


    function (session) {
        //reminder we can store variables in the session - useful for longer sessions

        builder.Prompts.text(session, "Please tell me the number of times you have been pregnant: ");

    },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "What's your glucose levels in mg/Dl? ");
        },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "What's your blood pressure in mm Hg? ");
        },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "What's your triceps skin fold thickness in mm? ");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "What's your body mass index in kg/(height^2)? ");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "What's your diabetes Pedigree function? ");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "What's your Age? ");
    },
    function(session,results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput

        request.post({
            url: 'http://127.0.0.1:5000/predictDiabetes',     //changed here to predict diabetes
            body: record
     }, function (r1, r2) {
           response_value = r2.body;

           session.endDialog("RESPONSE: "+response_value);

           record="";

           session.endDialog('End dialog.');
     })
   }

]).triggerAction({
    matches: /^diabetes$/i
});

// cervical


bot.dialog('cervical', [


    function (session) {
        //reminder we can store variables in the session - useful for longer sessions

        builder.Prompts.text(session, "Please tell me your age: "); //1

    },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Please, tell me the number of sexual partners you had? "); //2
        },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Please, tell me when was the first time of your sexual intercourse? "); //3
        },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Please, tell me how many times you have been pregnant? "); //4
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Do you smoke? '0' for no, '1' for yes: "); //5
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Do you take hormonal contraceptives? '0' for no, '1' for yes: "); //6
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "How many years you take hormonal contraceptives? "); //7
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Have you used Intrauterine device? '0' for no, '1' for yes: "); //8
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "How many years you used Intrauterine device? "); //9
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Have you ever had STDs? '0' for no, '1' for yes: "); //10
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        if(session.dialogData.wordInput == '0'){
            record += session.dialogData.wordInput + ","
            record += session.dialogData.wordInput + ","
            record += session.dialogData.wordInput + ","
            record += session.dialogData.wordInput + ","
            record += session.dialogData.wordInput + ","
            record += session.dialogData.wordInput + ","
            record += session.dialogData.wordInput + ","
            record += session.dialogData.wordInput + ","
            record += session.dialogData.wordInput + ","
            record += session.dialogData.wordInput + ","
            record += session.dialogData.wordInput + ","
            record += session.dialogData.wordInput + ","
            record += session.dialogData.wordInput + ","
            oncotype = true
            builder.Prompts.text(session, "Have you ever had Oncotype DX test taken? '0' for no, '1' for yes: "); //24
        }
        else{
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Please, tell me the number of STDs you had or have? "); //11
        }
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        if(oncotype){
        builder.Prompts.text(session, "Have you ever been diagnosed with CIN(cervical intra-epithelial neoplasia)? '0' for no, '1' for yes: "); //25
        CIN =true
        }
        else{
            builder.Prompts.text(session, "Do you have condylomatosis? '0' for no, '1' for yes: "); //12
        }
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        if(CIN){
        builder.Prompts.text(session, "Have you ever been diagnosed with HPV? '0' for no, '1' for yes: "); //26
        HPV = true;
        }
        else{
            builder.Prompts.text(session, "Do you have cervical condylomatosis? '0' for no, '1' for yes: "); //13
        }
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        if(HPV){
        builder.Prompts.text(session, "Have you ever had Hinselmann's test(colposcopy) taken? '0' for no, '1' for yes: "); //27
        Colposcopy = true;
        }
        else{
            builder.Prompts.text(session, "Do you have vaginal condylomatosis? '0' for no, '1' for yes: "); //14
        }
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        if(Colposcopy){
        builder.Prompts.text(session, "Have you ever had Schiller's test taken? '0' for no, '1' for yes: "); //28
        Schiller = true;
        }
        else{
            builder.Prompts.text(session, "Do you have vulvo-perineal condylomatosis? '0' for no, '1' for yes: "); //15
        }
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        if(Schiller){
        builder.Prompts.text(session, "Have you ever had cytology test taken? '0' for no, '1' for yes: "); //29
        Cytology = true;
        }
        else{
            builder.Prompts.text(session, "Do you have syphilis? '0' for no, '1' for yes: "); //16
        }
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        if(Cytology){
        builder.Prompts.text(session, "Have you ever had biopsy test taken? '0' for no, '1' for yes: "); //30
        Biopsy = true;
        }
        else{
            builder.Prompts.text(session, "Do you have pelvic inflammatory disease? '0' for no, '1' for yes: "); //17
        }
    },
    function(session,results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput +","
        if(Biopsy){
        request.post({
            url: 'http://127.0.0.1:5000/predictCervical',     //changed here to predict cervical
            body: record
     }, function (r1, r2) {
           response_value = r2.body;

           session.endDialog("RESPONSE: "+response_value);

           session.endDialog('End dialog.');
     })}
     else{
        builder.Prompts.text(session, "Do you have genetical herpes? '0' for no, '1' for yes: "); //18

     }
   },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Do you have molluscum contagiosum? '0' for no, '1' for yes: "); //19
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Do you have AIDS? '0' for no, '1' for yes: "); //20
    },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Do you have HIV? '0' for no, '1' for yes: "); //21
    },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Do you have HepatitisB? '0' for no, '1' for yes: "); //22
    },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Do you have HPV? '0' for no, '1' for yes: "); //23
    },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Have you ever had Oncotype DX test taken? '0' for no, '1' for yes: "); //24
    },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Have you ever been diagnosed with CIN(cervical intra-epithelial neoplasia)? '0' for no, '1' for yes: "); //25
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Have you ever been diagnosed with HPV? '0' for no, '1' for yes: "); //26
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Have you ever taken Hinselmann's test? '0' for no, '1' for yes: "); //27
    },function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Have you ever taken Schiller's? '0' for no, '1' for yes: "); //28
    },function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Have you ever taken cytology's test? '0' for no, '1' for yes: "); //29
    },function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Have you ever taken biopsy's test? '0' for no, '1' for yes: "); //30
    },function(session,results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput
        request.post({
            url: 'http://127.0.0.1:5000/predictCervical',     //changed here to predict diabetes
            body: record
     }, function (r1, r2) {
           response_value = r2.body;

           session.endDialog("RESPONSE: "+response_value);

           record="";

        })}

]).triggerAction({
    matches: /^cervical$/i
});




bot.dialog('lung', [


    function (session) {
        //reminder we can store variables in the session - useful for longer sessions

        builder.Prompts.text(session, "Please, tell me the time of your survival in days: ");

    },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "Please, tell me your age: ");
        },

    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.choice(session, "What's your 'sex':", 'Male|Female', {listStyle: builder.ListStyle.button});
        },

    function (session, results){
        if(results.response =='Male'){
            session.dialogData.wordInput = 1
        }
        else{
            session.dialogData.wordInput = 2
        }
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "What's your ECOG performance score(between 0 and 5)? ");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "What's your Karnofsky performance test based on Physician? ");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "What's your Karnofsky performance test based on yourself? ");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "How many Kilocalories do you consume a day? ");
    },
    function (session, results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput + ","
        builder.Prompts.text(session, "How many kilograms did you lose in the last 6 months ? ");
    },
    function(session,results){
        session.dialogData.wordInput = results.response
        record += session.dialogData.wordInput

        request.post({
            url: 'http://127.0.0.1:5000/predictLung',     //changed here to predict diabetes
            body: record
     }, function (r1, r2) {
           response_value = r2.body;

           session.endDialog("RESPONSE: "+response_value);

           record ="";

           session.endDialog('End dialog.');
     })
   }

]).triggerAction({
    matches: /^lung$/i
});
