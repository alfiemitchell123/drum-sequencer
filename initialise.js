		var counter;

		var filters = [];
		for (counter = 0; counter < 8; counter+=1) {
			filters[counter] = new Tone.Filter(0, "highpass");
		}

		var distortion = [];
		for (counter = 0; counter < 8; counter+=1) {
			distortion[counter] = new Tone.Distortion(1);
			distortion[counter].wet.value = 0;
		}

		var reverb = [];
		for (counter = 0; counter < 8; counter+=1) {
			reverb[counter] = new Tone.Freeverb();
			reverb[counter].roomSize.value = 0.75;
			reverb[counter].dampening.value = 8000;
			reverb[counter].wet.value = 0;
		}

		// this array will store our players 
		// we later load samples in to them
		var players = [];
		for (counter = 0; counter < 8; counter+=1) {
			players[counter] = new Tone.Player();
		}

		// we have a bunch of different kit samples - all in different folder
		var kitNames = [
			"Hip_Hop/",
			"House/",
			"Garage/",
			"Drum_And_Bass/"
		];

		// every sample MUST have the same name, no matter which kit folder it was in
		var filenames = [
			"Kick.wav",
			"Snare.wav",
			"Clap.wav",
			"Closed_Hat.wav",
			"Open_Hat.wav",
			"Tom.wav",
			"Perc_1.wav",
			"Perc_2.wav"
		];

		function changeKitTo(kitNumber) {
		    // select the kit and load it
			for (var counter = 0; counter < 8; counter+=1) {
				var filename = kitNames[kitNumber] + filenames[counter];
				console.log("player number " + counter + " will load " + filename);
				players[counter].load(filename);
				// players[counter].connect(filters[counter]);
				players[counter].chain(filters[counter], distortion[counter], reverb[counter], Tone.Master);
			    players[counter].retrigger = true;
			}
		}

		// load kit number 0 by default
		changeKitTo(0);

		nx.onload = function() {

			// Set up the size (rows and columns) of the sequencer
			sequencer.col = 16;
			sequencer.row = 8;
			sequencer.init(); // Initalises the sequencer

			// set up colours
			nx.colorize("accent" , "#00c1c1" ); // Sets the overall fill colour of the Nexus UI objects
			nx.labelSize(50); // Sets the label size of the Nexus UI objects

			// Set up the sequence callback
			sequencer.on("*", sequencerActions);

			// Set up the on/off button
			startStopBtn.on("*", toggleActions);

			// Set up the tempo dial
			tempoDial.on("*", tempoActions);
			tempoDial.responsivity = 0.002;

			// Set up the arrays for the sliders
			var gainSliders = [kickGainSlider, snareGainSlider, clapGainSlider, cHatGainSlider, oHatGainSlider, tomGainSlider, perc1GainSlider, perc2GainSlider];
			var filterSliders = [kickCutoffSlider, snareCutoffSlider, clapCutoffSlider, cHatCutoffSlider, oHatCutoffSlider, tomCutoffSlider, perc1CutoffSlider, perc2CutoffSlider];
			var distortionSliders = [kickDryWetSlider, snareDryWetSlider, clapDryWetSlider, cHatDryWetSlider, oHatDryWetSlider, tomDryWetSlider, perc1DryWetSlider, perc2DryWetSlider];
			var reverbSliders = [kickReverbSlider, snareReverbSlider, clapReverbSlider, cHatReverbSlider, oHatReverbSlider, tomReverbSlider, perc1ReverbSlider, perc2ReverbSlider];

			// Set the initial parameters of the gain sliders within a loop
			for (counter = 0; counter < 8; counter+=1) {
				gainSliders[counter].on("*", gainSliderActions);
				gainSliders[counter].min = -35;
				gainSliders[counter].max = 0;
				gainSliders[counter].val.value = 0;
				gainSliders[counter].init();
			}

			// Set the initial parameters of the filter sliders within a loop
			for (counter = 0; counter < 8; counter+=1) {
				filterSliders[counter].on("*", filterSliderActions);
				filterSliders[counter].min = 0;
				filterSliders[counter].max = 5000;
				filterSliders[counter].val.value = 0;
				filterSliders[counter].init();
			}

			// Set the initial parameters of the distortion sliders within a loop
			for (counter = 0; counter < 8; counter+=1) {
				distortionSliders[counter].on("*", distortionSliderActions);
				distortionSliders[counter].min = 0;
				distortionSliders[counter].max = 1;
				distortionSliders[counter].val.value = 0;
				distortionSliders[counter].init();
			}

			// Set the initial parameters of the reverb sliders within a loop
			for (counter = 0; counter < 8; counter+=1) {
				reverbSliders[counter].on("*", reverbSliderActions);
				reverbSliders[counter].min = 0;
				reverbSliders[counter].max = 1;
				reverbSliders[counter].val.value = 0;
				reverbSliders[counter].init();
			}
		}