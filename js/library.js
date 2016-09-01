var JF = {
	menu_btn : null,
	menu_wrapper : null,
	preloader: null,
	pagewrapper:null,
	COMMENT:{"Main":null,"Sub":null},
	StopTyping:false,
	rndComments:["Thanks for not using Internet Explorer",
				"I like Android, but never call me a 'fanboy'",
				"Sometimes i can be a perfectionist",
				"50% Dutch, 50% Ethiopian",
				"I like drawing cars",,
				"Bucketlist 5/10 - Make a professional music video",
				"Lap 21 around the sun!",
				"Shout out to Stackoverflow for being there for me!"],
	SliderOrientation:null,
	nrOfPanels:null,
	TotWidth:null,
	TotHeight:null,
	pictures:null,
	snapTimeOut:false,
	scrollspeed:null,
	
	init: function(){
		//refer to some elements
		JF.menu = document.getElementById('menu');
		JF.rndMenuComment = document.getElementById('menuComment');
		JF.menu_btn = document.getElementById('menu_btn');
		JF.preloader = document.getElementById('preloader');
		JF.pagewrapper = document.getElementById('pagewrapper');
		JF.COMMENT.Main = document.getElementById('COMMENT').getElementsByTagName('h2');
		JF.COMMENT.Sub = document.getElementById('COMMENT').getElementsByClassName('comment')[0];
		JF.pictures = document.getElementById('photo').getElementsByTagName('img');
		JF.scrollspeed = 200;
		
		//interactions:
		$('#menu_btn').click(function(){
			if(JF.hasClass(JF.menu_btn, 'click2open')){
				JF.open_menu();
				JF.replaceClass(JF.menu_btn, 'click2open','click2close');
			}else if(JF.hasClass(JF.menu_btn, 'click2close')){
				JF.close_menu();
				JF.replaceClass(JF.menu_btn, 'click2close','click2open');
			}
		});
		$('#CONTENT').on("scroll resize", function(){
			
			//500 ms after the start of a scroll event the slider will snap
			//snapTimeOut cancels double snaprequests
			if(JF.snapTimeOut == false){
				JF.snapTimeOut = true;
				
				console.log('snap in 500ms');
				//snap slider after 500ms when scroll is done
				setTimeout(function(){
					if(JF.snapTimeOut == true){
						JF.snapSlider();
						console.log('snap');
					}
				},500);
			}
		});
		$('#backBtn').click(function(){JF.scroll2('back')});
		$('#nextBtn').click(function(){JF.scroll2('next')});
		
		//hide preloader and show page after 1 sec to make shure everything can run smooth
		setTimeout(function(){
			JF.replaceClass(JF.preloader, 'show', 'hide');
			JF.replaceClass(JF.pagewrapper, 'hide', 'show');
			
			//Wait for welcome message 500ms, then snap en type rest
			JF.Type(JF.COMMENT.Main, "Hi there, i'm Jonathan Ferede", function(){
				setTimeout(function(){
                    console.log('done waiting... type!');
					JF.snapSlider();
				}, 500);
			});
		}, 1000);
	},
	
	hasClass: function (element, cls) {
		//check if element has a class
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	},
	replaceClass: function(el, oldClass, newClass){
		//replace class of element
		el.className = el.className.replace(oldClass , newClass);
	},
	
	open_menu: function (){
		//open menu by changing class from closed to open
		JF.replaceClass(JF.menu, 'closed', 'open');
		var comment = JF.rndComments[Math.floor(Math.random() * JF.rndComments.length)];
	    while(JF.rndMenuComment.innerHTML == comment){
			comment = JF.rndComments[Math.floor(Math.random() * JF.rndComments.length)];
		}
		
		console.log(comment);
		//when menu is open, type a random comment with JF.type2 
		//Type2 doesnt cancel or interfear with JF.type
		JF.Type2([JF.rndMenuComment], comment);
	},
	close_menu: function (){
		//open menu by changing class from open to closed
		JF.replaceClass(JF.menu, 'open', 'closed');
	},
	
	snapSlider: function (){
		//scroll to panel that is most in viewport
		JF.nrOfPanels = $('.slider li').length;
		JF.TotWidth = $('ul.slider').width();
		JF.TotHeight = $('ul.slider').height();

		//Is slider vertical or horizontal?
		if(JF.TotHeight > JF.TotWidth){
			JF.SliderOrientation = 'vertical';

			var height = JF.TotHeight/JF.nrOfPanels;
			var scrl = $('#welcome').position().top;
			var Panel2Run = null;
			
			//determain where to snap to
			if(scrl>-(height/2)){
				JF.scroll2(0);
				Panel2Run = 'welcome';
				JF.replaceClass(document.getElementById('backBtn'),'show','hide');
				JF.replaceClass(document.getElementById('nextBtn'),'hide','show');
			}else if(scrl>-((height/2)+height)){
				JF.scroll2(height);
				Panel2Run = 'webdesign';
				JF.replaceClass(document.getElementById('backBtn'),'show','hide');
				JF.replaceClass(document.getElementById('nextBtn'),'hide','show');
			}else if(scrl>-((height/2)+height*2)){
				JF.scroll2(height*2);
				Panel2Run = 'video';
				JF.replaceClass(document.getElementById('backBtn'),'hide','show');
				JF.replaceClass(document.getElementById('nextBtn'),'hide','show');
			}else if(scrl>-((height/2)+height*3)){
				JF.scroll2(height*3);
				Panel2Run = 'photo';
				JF.replaceClass(document.getElementById('backBtn'),'hide','show');
				JF.replaceClass(document.getElementById('nextBtn'),'hide','show');
			}else if(scrl>-((height/2)+height*4)){
				JF.scroll2(height*4);
				Panel2Run = 'timeline';
				JF.replaceClass(document.getElementById('backBtn'),'hide','show');
				JF.replaceClass(document.getElementById('nextBtn'),'hide','show');
			}else if(scrl>-((height/2)+height*5)){
				JF.scroll2(height*5);
				Panel2Run = 'contact';
				JF.replaceClass(document.getElementById('backBtn'),'hide','show');
				JF.replaceClass(document.getElementById('nextBtn'),'show','hide');
			}
		}
		else{
			JF.SliderOrientation = 'horizontal';

			var width = JF.TotWidth/JF.nrOfPanels;
			var scrl = $('#welcome').position().left;

			//determain where to snap to
			if(scrl>-(width/2)){
				JF.scroll2(0);
				Panel2Run = 'welcome';
			}else if(scrl>-((width/2)+width)){
				JF.scroll2(width);
				Panel2Run = 'webdesign';
			}else if(scrl>-((width/2)+width*2)){
				JF.scroll2(width*2);
				Panel2Run = 'video';
			}else if(scrl>-((width/2)+width*3)){
				JF.scroll2(width*3);
				Panel2Run = 'photo';
			}else if(scrl>-((width/2)+width*4)){
				JF.scroll2(width*4);
				Panel2Run = 'timeline';
			}else if(scrl>-((width/2)+width*5)){
				JF.scroll2(width*5);
				Panel2Run = 'contact';
			}
		}

		//run this panel
		JF.RunPanel(document.getElementById(Panel2Run));
	},
	scroll2(x){
        
        if(x != $('#welcome').position().left || x != $('#welcome').position().top){
            console.log('scroll '+x)
            //scroll2 can receive an int or 'next'/'back'

            if (x === parseInt(x, 10)){
                //if x is a number... scroll that amount of pixels
                var dist = x;

                if(JF.SliderOrientation == 'horizontal'){
                    $('#CONTENT').animate({	scrollLeft: dist }, JF.scrollspeed);
                }else{
                    $('#CONTENT').animate({	scrollTop: dist }, JF.scrollspeed);
                }
            }else{
                //if x is a string... scroll back or forward			

                if(JF.SliderOrientation == 'horizontal'){
                    var scrolled = -$('#welcome').position().left;
                    var dist = JF.TotWidth/JF.nrOfPanels;

                    if(x == 'next'){
                        dist = scrolled+dist;
                        $('#CONTENT').animate({	scrollLeft: dist }, JF.scrollspeed);
                    }
                    else if(x == 'back'){
                        dist = scrolled-dist;
                        $('#CONTENT').animate({	scrollLeft: dist }, JF.scrollspeed);
                    }
                }
                else{
                    var scrolled = -$('#welcome').position().top;
                    var dist = JF.TotHeight/JF.nrOfPanels;

                    if(x == 'next'){
                        dist = scrolled+dist;
                        $('#CONTENT').animate({	scrollTop: dist }, JF.scrollspeed);
                    }
                    else if(x == 'back'){
                        dist = scrolled-dist;
                        $('#CONTENT').animate({	scrollTop: dist }, JF.scrollspeed);
                    }
                }

                setTimeout(function(){	
                    console.log('scrolled... now snap!')
                    JF.snapTimeOut = false;
                    //JF.snapSlider();
                },JF.scrollspeed)
            }
            setTimeout(function(){
                JF.snapTimeOut = false;
            },JF.scrollspeed)
        }
        else{
            console.log('no need to scroll');
        }
            
	},
	RunPanel: function(panel){
        
        
		//reset other panels classname and set this panel to .activePanel
		for(i=0;i<document.getElementsByClassName('activePanel').length;i++){
			JF.replaceClass(document.getElementsByClassName('activePanel')[i], 'activePanel', 'nonactivePanel');
		}
		JF.replaceClass(panel, 'nonactivePanel', 'activePanel');
		
		//Back/Next Button (dis)appear
		if(panel.id == 'welcome'){
			JF.replaceClass(document.getElementById('backBtn'),'show','hide');
			JF.replaceClass(document.getElementById('nextBtn'),'hide','show');
		}else if(panel.id == 'contact'){
			JF.replaceClass(document.getElementById('backBtn'),'hide','show');
			JF.replaceClass(document.getElementById('nextBtn'),'show','hide');
		}else{
			JF.replaceClass(document.getElementById('backBtn'),'hide','show');
			JF.replaceClass(document.getElementById('nextBtn'),'hide','show');
		}
		
		
		if(panel.id == "welcome"){
			var MainComment = "Hi there, i'm Jonathan Ferede and i am a media-designer<b></b>";
			var SubComment = "The perfect combination of logic and creativity";
		}else if(panel.id == "webdesign"){
			var MainComment = "I love making websites like the one you're on right now, <b></b>";
			var SubComment = 'Apart from the fonts and jQuery i built every element of this website myself';
			var promovideo = document.getElementById('promovideo');
			JF.playPause([promovideo]);
		}else if(panel.id == "video"){
			var MainComment = "Besides coding, i also love to create video's like these, <b></b>";
			var SubComment = 'Click on my <a href="https://www.youtube.com/channel/UCnbyOLh_vrjVYzAw14oFEOQ" target="_blank"><i class="fa fa-youtube-play" style="color:red; font-size: 150%; display: inline-block; vertical-align: middle;"></i></a> channel for more video&#39;s like musicvideo&#39;s, speedart and more!';
			var promovideo = document.getElementById('promovideo');
			JF.playPause([promovideo]);
		}else if(panel.id == "photo"){
			var MainComment = "Besides coding, i also love take pictures like these. <b></b>";
			var SubComment = "Just add some FIRE!";
			
			JF.showNextImg(0);
			
		}else if(panel.id == "timeline"){
			var MainComment = "Right now, i'm looking for an internship. <b></b>";
			var SubComment = "In the Netherlands is oke, somewhere else would be awesome!";
		}else if(panel.id == "contact"){
			var MainComment = "Please contact me. <b></b>";
			var SubComment = "I won't bite";
			
			
		}
		
		//type something and do stuff after
		JF.Type(JF.COMMENT.Main, MainComment, function(){
			JF.COMMENT.Sub.innerHTML = SubComment;
			JF.replaceClass(JF.COMMENT.Sub, 'transparent', 'visable');
		});
	},
	Type: function(elements, NewString, callback){
        console.log('typing')
		var backspaceSpeed = 23;
		var MINwriteInterval = 10;
		var MAXwriteInterval = 10;
		
		//Cancel other writing requests
		JF.StopTyping = true;
		
		//Wait till they stopped
		setTimeout(function () {
			JF.StopTyping = false;
			
			JF.replaceClass(JF.COMMENT.Sub, 'visable', 'transparent');

			var OldChars = elements[0].innerHTML.split("");
			var NewChars = NewString.split("");

			//determine until where to backspace
			var NrOfMatchingChars = 0;
			for(i=0;i<JF.Smallest(OldChars.length, NewChars.length);i++){
				if(OldChars[i] == NewChars[i]){
					NrOfMatchingChars++;
				}else{
					break;
				}
			}

			var opmerking;
			//Write
			function write (j) {
				setTimeout(function () {
					if(JF.StopTyping == false){
						if(typeof NewChars[j] != 'undefined'){
							opmerking += NewChars[j];
							for(a=0;a<elements.length;a++){
								elements[a].innerHTML = opmerking;
							}
							j++;
							if (j < NewChars.length) {
								write(j);
							}else{
								JF.Typing = false;
								JF.replaceClass(JF.pagewrapper, 'intro', '');
								callback();
							}
						}
					}
				}, (Math.floor((Math.random() * MAXwriteInterval) + MINwriteInterval)))
			}

			//Backspace
			function backspace (i) {
				setTimeout(function () {
					if(JF.StopTyping == false){
						OldChars.splice(i, 1);
						opmerking = OldChars.join('');
						for(a=0;a<elements.length;a++){
							elements[a].innerHTML = opmerking;
						}
						i--;
						if (i>=NrOfMatchingChars) {
							backspace(i);
						}else{
							var j = NrOfMatchingChars;
							write(j);
						}	
					}
				}, backspaceSpeed)
			}
			backspace(OldChars.length);
		},300)
	},
	Type2: function(elements, NewString){
		var backspaceSpeed = 20;
		var writeSpeed = 30;
		
		
		//Wait till they stopped
		setTimeout(function () {

			var OldChars = elements[0].innerHTML.split("");
			var NewChars = NewString.split("");

			//determine until where to backspace
			var NrOfMatchingChars = 0;
			for(i=0;i<JF.Smallest(OldChars.length, NewChars.length);i++){
				if(OldChars[i] == NewChars[i]){
					NrOfMatchingChars++;
				}else{
					break;
				}
			}

			var opmerking;
			//Write
			function write (j) {
				setTimeout(function () {
						if(typeof NewChars[j] != 'undefined'){
							opmerking += NewChars[j];
							for(a=0;a<elements.length;a++){
								elements[a].innerHTML = opmerking;
							}
							j++;
							if (j < NewChars.length) {
								write(j);
							}else{
								JF.Typing = false;
							}
						}
				}, writeSpeed)
			}

			//Backspace
			function backspace (i) {
				setTimeout(function () {
						OldChars.splice(i, 1);
						opmerking = OldChars.join('');
						for(a=0;a<elements.length;a++){
							elements[a].innerHTML = opmerking;
						}
						i--;
						if (i>=NrOfMatchingChars) {
							backspace(i);
						}else{
							var j = NrOfMatchingChars;
							write(j);
						}
				}, backspaceSpeed)
			}
			backspace(OldChars.length-1);
		},(backspaceSpeed+writeSpeed))
	},
	Smallest: function(a,b){
		if(a < b){
			return a;
		}else{
			return b;
		}
	},
	playPause: function(myVideo) {
		for(i=0;i<myVideo.length;i++){
			if (myVideo[i].paused){
				myVideo[i].play();
			}
			else{
				//myVideo[i].pause();
			}
		}
	},
	
	showNextImg: function(x){
		//hide them all
		for(i=0;i<JF.pictures.length;i++){
			JF.replaceClass(JF.pictures[i],'full','null');
		}

		//show the x-th picture
		JF.replaceClass(JF.pictures[x],'null','full');

		x++;

		//reset x if needed
		if(x >= JF.pictures.length){
			x = 0;
		}

		//again
		if(document.getElementById('photo').className == 'activePanel'){
			setTimeout(function(){
				JF.showNextImg(x);
			},3000);
		}
	}

}

