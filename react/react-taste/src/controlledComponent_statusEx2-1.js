import React from 'react';
import ReactDOM from 'react-dom';

// [Detail]
// 1. React는 DOM <input>의 onChange에 지정된 함수를 호출합니다. 
// 	위 예시의 경우 TemperatureInput의 handleChange 메서드에 해당합니다.
// 2. TemperatureInput 컴포넌트의 handleChange 메서드는 새로 입력된 값과 함께 this.props.onTemperatureChange()를 호출합니다. 
// 	onTemperatureChange를 포함한 이 컴포넌트의 props는 부모 컴포넌트인 Calculator로부터 제공받은 것입니다.
// 3. 이전 렌더링 단계에서, Calculator는 섭씨 TemperatureInput의 onTemperatureChange를 Calculator의 handleCelsiusChange 메서드로, 
// 	화씨 TemperatureInput의 onTemperatureChange를 Calculator의 handleFahrenheitChange 메서드로 지정해놓았습니다. 
// 	따라서 우리가 둘 중에 어떤 입력 필드를 수정하느냐에 따라서 Calculator의 두 메서드 중 하나가 호출됩니다.
// 4. 이들 메서드는 내부적으로 Calculator 컴포넌트가 새 입력값, 
// 	그리고 현재 수정한 입력 필드의 입력 단위와 함께 this.setState()를 호출하게 함으로써 React에게 자신을 다시 렌더링하도록 요청합니다.
// 5. React는 UI가 어떻게 보여야 하는지 알아내기 위해 Calculator 컴포넌트의 render 메서드를 호출합니다. 
//	두 입력 필드의 값은 현재 온도와 활성화된 단위를 기반으로 재계산됩니다. 
//	온도의 변환이 이 단계에서 수행됩니다.
// 6. React는 Calculator가 전달한 새 props와 함께 각 TemperatureInput 컴포넌트의 render 메서드를 호출합니다. 
// 	그러면서 UI가 어떻게 보여야 할지를 파악합니다.
// 7. React는 BoilingVerdict 컴포넌트에게 섭씨온도를 props로 건네면서 그 컴포넌트의 render 메서드를 호출합니다.
// 8. React DOM은 물의 끓는 여부와 올바른 입력값을 일치시키는 작업과 함께 DOM을 갱신합니다. 
// 	값을 변경한 입력 필드는 현재 입력값을 그대로 받고,
// 	다른 입력 필드는 변환된 온도 값으로 갱신됩니다.


const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);

