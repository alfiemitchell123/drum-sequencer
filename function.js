		function tempoActions(event) { // This function sets up the dial to control the BPM of the sequencer.
			sequencer.bpm = tempoDial.val.value * 2;
		}

		var jumpToStartButton = document.getElementById("jumpToStartButton");
		jumpToStartButton.addEventListener("click", jumpToStartOfSequencer);

		function jumpToStartOfSequencer() { // This function sets up the ability to jump to the start of the sequencer using a button.
			sequencer.jumpToCol(0);
		}

		var clearButton = document.getElementById("clearButton");
		clearButton.addEventListener("click", clearActions);

		function clearActions(event) { // This function sets up the ability to clear the sequencer using a button.
			for (var c = 0; c < sequencer.col; c+=1) {
				for (var r = 0; r < sequencer.row; r+=1) {
					sequencer.matrix[c][r] = 0;
				}
			}

			sequencer.draw();
		}

		function sequencerActions(data) { // This function sets up the sequencer so the players can play according to which step is on/off.
			if (data.list != undefined) {
				for (counter = 0; counter < 8; counter+=1) {
					if (data.list[counter] == 1) {
						players[counter].start();
					}
				}
			}
		}

		function toggleActions(event) { // This functions controls the on/off state of the sequencer, which the user controls using the toggle button.
			if(event.value == 1) {
				sequencer.sequence(tempoDial.val.value);
			}
			else {
				sequencer.stop();
			}
		}

		window.addEventListener("keypress", keyboardActions);

		function keyboardActions(key) { // This function controls the use of the QWERTY keyboard, which (when a certain key is pressed), can control a certain parameter.
			if (key.keyCode == "32") {
				if (startStopBtn.val.value == 0) {
					startStopBtn.val.value = 1;
					startStopBtn.init();
					sequencer.sequence(tempoDial.val.value);
				}
				else if (startStopBtn.val.value == 1) {
					startStopBtn.val.value =  0;
					startStopBtn.init();
					sequencer.stop();
				}
			}
		}

		var drumKitSelect = document.getElementById("drumKitSelect");
		drumKitSelect.addEventListener("input", drumKitActions);

		function drumKitActions() { // This function controls the dropdown menu, so the user can select which type of kit they want to use.
			switch(drumKitSelect.value){
    			case "hipHop":
      				changeKitTo(0);
      				console.log("value 1 selected");
      				break;
			    case "house":
			      	changeKitTo(1);
			      	console.log("value 2 selected");
			      	break;
			    case "garage":
			      	changeKitTo(2);
			      	console.log("value 3 selected");
			      	break;
			    case "drumAndBass":
			      	changeKitTo(3);
			      	console.log("value 4 selected");
  			}

		}
		
		function gainSliderActions() { // This function controls the gain sliders.
			var gainSliders = [kickGainSlider, snareGainSlider, clapGainSlider, cHatGainSlider, oHatGainSlider, tomGainSlider, perc1GainSlider, perc2GainSlider];
			for (counter = 0; counter < 8; counter+=1) {
				players[counter].volume.value = gainSliders[counter].val.value;
			}
		}

		function filterSliderActions() { // This function controls the filter sliders.
			var filterSliders = [kickCutoffSlider, snareCutoffSlider, clapCutoffSlider, cHatCutoffSlider, oHatCutoffSlider, tomCutoffSlider, perc1CutoffSlider, perc2CutoffSlider];
			for (counter = 0; counter < 8; counter+=1) {
				filters[counter].frequency.value = filterSliders[counter].val.value;
			}
		}

		function distortionSliderActions() { // This function controls the distortion sliders.
			var distortionSliders = [kickDryWetSlider, snareDryWetSlider, clapDryWetSlider, cHatDryWetSlider, oHatDryWetSlider, tomDryWetSlider, perc1DryWetSlider, perc2DryWetSlider];
			for (counter = 0; counter < 8; counter+=1) {
				distortion[counter].wet.value = distortionSliders[counter].val.value;
			}
		}

		function reverbSliderActions() { // This function controls the reverb sliders.
			var reverbSliders = [kickReverbSlider, snareReverbSlider, clapReverbSlider, cHatReverbSlider, oHatReverbSlider, tomReverbSlider, perc1ReverbSlider, perc2ReverbSlider];
			for (counter = 0; counter < 8; counter+=1) {
				reverb[counter].wet.value = reverbSliders[counter].val.value;
			}
		}

		// var textChangeBtn = document.getElementsByClassName("textChangeBtn");
		// textChangeBtn.addEventListener("click", textChangeBtnActions);

		// function textChangeBtnActions() {
		// 	if (textChangeBtn.getAttribute("data-text-swap") == textChangeBtn.innerHTML) {
		// 		textChangeBtn.innerHTML = textChangeBtn.getAttribute("data-text-original");
		// 	}
		// 	else {
		// 		textChangeBtn.setAttribute("data-text-original", textChangeBtn.innerHTML);
		// 		textChangeBtn.innerHTML = textChangeBtn.getAttribute("data-text-swap");
		// 	}
		// }

		var showMixerBtn = document.getElementById("showMixer");
		showMixerBtn.addEventListener("click", showMixerBtnActions);

		function showMixerBtnActions() { // This function controls how the 'Show Mixer' button acts and the text of the button depending on which state it is in.
			if (showMixerBtn.getAttribute("data-text-swap") == showMixerBtn.innerHTML) {
				showMixerBtn.innerHTML = showMixerBtn.getAttribute("data-text-original");
        		mixerSliders.style.display = "none";
			}
			else {
				showMixerBtn.setAttribute("data-text-original", showMixerBtn.innerHTML);
				showMixerBtn.innerHTML = showMixerBtn.getAttribute("data-text-swap");
        		mixerSliders.style.display = "block";
			}
		}

		var showFilterBtn = document.getElementById("showFilters");
		showFilterBtn.addEventListener("click", showFilterBtnActions);

		function showFilterBtnActions() { // This function controls how the 'Show Filters' button acts and the text of the button depending on which state it is in.
			if (showFilterBtn.getAttribute("data-text-swap") == showFilterBtn.innerHTML) {
				showFilterBtn.innerHTML = showFilterBtn.getAttribute("data-text-original");
        		filterSliders.style.display = "none";
			}
			else {
				showFilterBtn.setAttribute("data-text-original", showFilterBtn.innerHTML);
				showFilterBtn.innerHTML = showFilterBtn.getAttribute("data-text-swap");
        		filterSliders.style.display = "block";
			}
		}

		var changeFilterSetting = document.getElementById("changeFilterSetting");
		changeFilterSetting.addEventListener("click", changeFilterSettingActions);

		function changeFilterSettingActions() { // This function controls how the 'Change Filter Setting' button acts and the text of the button depending on which state it is in.
			if (changeFilterSetting.getAttribute("data-text-swap") == changeFilterSetting.innerHTML) {
				changeFilterSetting.innerHTML = changeFilterSetting.getAttribute("data-text-original");
				for (counter = 0; counter < 8; counter+=1) {
					filters[counter].type = "highpass";
				}
			}
			else {
				changeFilterSetting.setAttribute("data-text-original", changeFilterSetting.innerHTML);
				changeFilterSetting.innerHTML = changeFilterSetting.getAttribute("data-text-swap");
				for (counter = 0; counter < 8; counter+=1) {
					filters[counter].type = "lowpass";
				}
			}
		}

		var showDistortionBtn = document.getElementById("showDistortion");
		showDistortionBtn.addEventListener("click", showDistortionBtnActions);

		function showDistortionBtnActions() { // This function controls how the 'Show Distortion' button acts and the text of the button depending on which state it is in.
			if (showDistortionBtn.getAttribute("data-text-swap") == showDistortionBtn.innerHTML) {
				showDistortionBtn.innerHTML = showDistortionBtn.getAttribute("data-text-original");
        		distortionSliders.style.display = "none";
			}
			else {
				showDistortionBtn.setAttribute("data-text-original", showDistortionBtn.innerHTML);
				showDistortionBtn.innerHTML = showDistortionBtn.getAttribute("data-text-swap");
        		distortionSliders.style.display = "block";
			}
		}

		var showReverbBtn = document.getElementById("showReverb");
		showReverbBtn.addEventListener("click", showReverbBtnActions);

		function showReverbBtnActions() { // This function controls how the 'Show Reverb' button acts and the text of the button depending on which state it is in.
			if (showReverbBtn.getAttribute("data-text-swap") == showReverbBtn.innerHTML) {
				showReverbBtn.innerHTML = showReverbBtn.getAttribute("data-text-original");
        		reverbSliders.style.display = "none";
			}
			else {
				showReverbBtn.setAttribute("data-text-original", showReverbBtn.innerHTML);
				showReverbBtn.innerHTML = showReverbBtn.getAttribute("data-text-swap");
        		reverbSliders.style.display = "block";
			}
		}