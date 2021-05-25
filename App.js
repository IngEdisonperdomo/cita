import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Platform,
} from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';

const App = () => {
  const [mostrarForm, guardarMostrarForm] = useState(false);

  const [cita, setCitas] = useState([
    {id: '1', paciente: 'React', propietario: 'edison', sintomas: 'no come'},
    {id: '2', paciente: 'Native', propietario: 'perdomo', sintomas: 'fiebre'},
    {id: '3', paciente: 'Redux', propietario: 'jose', sintomas: 'tos'},
  ]);

  const eliminarPaciente = id => {
    setCitas(citasActuales => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de citas</Text>

      <View>
        <TouchableHighlight
          onPress={() => mostrarFormulario()}
          style={styles.btnSubmit}>
          <Text style={styles.textoSubmit}>Crear Cita</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.contenido}>
        {mostrarForm ? (
          <>
            <Text style={styles.titulo}>Crear nueva cita</Text>
            <Formulario />
          </>
        ) : (
          <>
            <Text style={styles.titulo}>
              {cita.length > 0
                ? 'Administra tus citas'
                : 'No hay citas agrega una'}
            </Text>

            <FlatList
              style={styles.listado}
              data={cita}
              renderItem={({item}) => (
                <Cita cita={item} eliminarPaciente={eliminarPaciente} />
              )}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#aa076b',
    flex: 1,
  },
  titulo: {
    color: '#fff',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
    marginBottom: 10,
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoSubmit: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
