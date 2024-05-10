import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Definindo a estrutura dos dados da resposta que nos interessam
interface WeatherDetails {
  main: string;
  description: string;
  icon: string;
}

interface WeatherResponse {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherDetails[];
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  // Outras propriedades conforme necessário...
}
const WeatherForecast: React.FC = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const apiKey = '4ba4fc1130c6632e7a1694eb303097fa'; // Substitua com sua chave real da API
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Florianopolis&appid=${apiKey}&units=metric`;
  //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sao+Paulo&appid=${apiKey}&units=metric`;


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get<WeatherResponse>(apiUrl);
        setWeather(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados da previsão do tempo:", error);
      }
    };

    fetchWeather();
  }, []);

  // Renderização condicional para garantir que weather e weather[0] existam
  if (!weather) {
    return <p>Carregando previsão do tempo...</p>;
  }

  const { temp, temp_min, temp_max, pressure, humidity } = weather.main;
  const [weatherDetails] = weather.weather;
  const { speed, deg } = weather.wind;
  const { all: cloudiness } = weather.clouds;
  const { sunrise, sunset } = weather.sys;
  const [firstWeatherCondition] = weather.weather;

  const tempround = Math.round(temp);

  // Converter os timestamps de sunrise e sunset em horários legíveis
  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

  // Obtém a data e hora atuais
  const currentDate = new Date();

  // Mapeia os números para os dias da semana
  const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const dayOfWeek = weekdays[currentDate.getDay()];

  // Mapeia os números para os meses
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const monthName = months[currentDate.getMonth()];

  // No JSX:
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="cardprimary">
            <h5><i className="fi fi-sr-marker"></i> Florianópolis</h5>
            <p className='zeroo fs-14'>{dayOfWeek}, {monthName}</p>
            <h1 className='temp'>{tempround}<span className='fs-16'>C</span></h1>
            <div className="row">
              <div className="col-6">
                <i className="fi fi-ts-temperature-high"></i>
                <h5 className='title-temp zeroo fs-16'>{temp_min}°C</h5>
                <p className='sub-temp zeroo fs-14'>Temp. Min.</p>
              </div>
              <div className="col-6">
                <i className="fi fi-ts-temperature-high"></i>
                <h5 className='title-temp zeroo fs-16'>{temp_max}°C</h5>
                <p className='sub-temp zeroo fs-14'>Temp. Max.</p>
              </div>
            </div>
          </div>
          <div className="cardprimary">
            <div className="row">
              <div className="col-12">
                <h5>Condição</h5>
              </div>
              <div className="col-12">
                {weatherDetails && (
                  <div>
                    <img src={`http://openweathermap.org/img/wn/${weatherDetails.icon}.png`} alt="Ícone do tempo" />
                  </div>
                )}
              </div>
              <div className="col-6">
                <i className="fi fi-ts-temperature-high"></i>
                <h5 className='title-temp zeroo fs-16'>{pressure} hPa</h5>
                <p className='sub-temp fs-14'>Pressão</p>
              </div>
              <div className="col-6">
                <i className="fi fi-ts-temperature-high"></i>
                <h5 className='title-temp zeroo fs-16'>{humidity}%</h5>
                <p className='sub-temp fs-14'>Umidade</p>
              </div>
              <div className="col-6">
                <i className="fi fi-ts-wind"></i>
                <h5 className='title-temp zeroo fs-16'>{speed} m/s</h5>
                <p className='sub-temp fs-14'>Vel. do Vento</p>
              </div>
              <div className="col-6">
                <i className="fi fi-ts-wind"></i>
                <h5 className='title-temp zeroo fs-16'>{deg}°</h5>
                <p className='sub-temp fs-14'>Direção do Vento:</p>
              </div>
              <div className="col-6">
                <i className="fi fi-ts-smoke"></i>
                <h5 className='title-temp zeroo fs-16'>{cloudiness}%</h5>
                <p className='sub-temp fs-14'>Nuvens</p>
              </div>
              <div className="col-6">
                <i className="fi fi-ts-brightness"></i>
                <h5 className='title-temp zeroo fs-16'>{sunriseTime}</h5>
                <p className='sub-temp fs-14'>Nascer do Sol</p>
              </div>
              <div className="col-6">
                <i className="fi fi-ts-brightness"></i>
                <h5 className='title-temp zeroo fs-16'>{sunsetTime}</h5>
                <p className='sub-temp fs-14'>Pôr do Sol</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
