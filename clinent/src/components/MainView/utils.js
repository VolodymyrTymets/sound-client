import { mean, max, reduce }from "ramda";
import config from '../../config'
import { meanSpectrumOfBreath } from "../../utils/MeanSpectrumOfBreath";

const getSpectrumInfo = (spectrum) => {
	const newSpectrumInfo = {
		meanOfBreath: null,
		color: null,
	};

	const meanSpectrum = parseInt(mean(spectrum), 10);
	const maxSpectrum = reduce(max, 0, spectrum);
	meanSpectrumOfBreath.listen(meanSpectrum, maxSpectrum);
	const meanOfBreath = meanSpectrumOfBreath.getMean();
	const timeLeft = meanSpectrumOfBreath.getTimeLeft();

	if(meanOfBreath) {
		/** taking into account that max spectrum of mic can't be > 100, need to calculate how much spectrum of breath
		 *  of stimulation bigger than spectrum of normal breath, from range that left.*/
		const left = config.MAX_SPECTRUM_OF_MIC - meanSpectrum;
		const leftMean = config.MAX_SPECTRUM_OF_MIC - meanOfBreath;
		const newRating = parseInt(100 - (left * 100) / leftMean, 10) || 0;
		if(leftMean > left) {
			newSpectrumInfo.meanOfBreathR = newRating;
			newSpectrumInfo.meanOfBreathR = newSpectrumInfo.meanOfBreathR > 0 ? newSpectrumInfo.meanOfBreathR : 0;
		}

	}
	newSpectrumInfo.color = meanSpectrumOfBreath.getColor(newSpectrumInfo.meanOfBreathR);
	if(newSpectrumInfo.meanOfBreathR) {
		meanSpectrumOfBreath.soundNotify(newSpectrumInfo.meanOfBreathR);
		meanSpectrumOfBreath.serverNotify(newSpectrumInfo.meanOfBreathR);
	}

	return { ...newSpectrumInfo, timeLeft, mean, meanOfBreath }
};

export { getSpectrumInfo };