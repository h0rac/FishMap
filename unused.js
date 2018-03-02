
/*
import { setSelectedDuration } from './src/actions/user';

setDurationTime (itemValue) {
	this.setState({pickerValue: itemValue})
	this.props.dispatch(setSelectedDuration(itemValue))
}

setDurationDisplay(value) {
	let display;
	console.log(value)
	if (value >= 60000 && value < 3600000) {
		display = 'm'
		value = Math.floor(value/1000/60)

	} else if (value >= 3600000) {
		display = 'h'
		value = Math.floor(value / 1000 / 60 / 60)
	} else {
		display = 's'
		value = value/1000
	}

	return ({value:value, display:display})
}

setPicker = () => {
	const durationObject = {
		'1 s':1000,
		'10 s':10000,
		'30 s':30000,
		'1 m':60000,
		'5 m':300000,
		'10 m':600000,
		'15 m':900000,
		'30 m':1800000,
		'1 h':3600000,
		'5 h':18000000,
		'10 h':36000000,
		'15 h':54000000,
		'1 day':86400000,
		'2 days':172800000
	};
	const picker = Object.keys(durationObject).map((item,index) => {
		return (<Picker.Item key={index} label={item} value={durationObject[item]} />)
	})
	return picker;
}


	<Picker
					selectedValue={this.props.tempDuration ? this.props.tempDuration: this.props.duration}
					onValueChange={(itemValue, itemIndex) => this.setDurationTime(itemValue)}>
					{this.setPicker().map(item => item)}
				</Picker>

*/