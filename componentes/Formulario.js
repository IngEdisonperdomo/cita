import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({cita, setCitas, guardarMostrarForm}) => {
  const [paciente, guardarPaciente] = useState('');
  const [propietario, guardarPropietario] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [sintomas, guardarSintomas] = useState('');
  const [fecha, guardarFecha] = useState('');
  const [hora, guardarHora] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = date => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    guardarFecha(date.toLocaleDateString('es-Es', opciones));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = hora => {
    const opciones = {hour: 'numeric', minute: '2-digit'};
    guardarHora(hora.toLocaleString('en-US', opciones));
    hideTimePicker();
  };

  const crearNuevaCita = () => {
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      mostrarAlerta();
      return;
    }

    const citas = {paciente, propietario, telefono, fecha, hora, sintomas};
    citas.id = shortid.generate();

    const crearCita = [...cita, citas];
    setCitas(crearCita);

    guardarMostrarForm(false);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Todos los campos son obligatorio', [
      {
        text: 'Ok',
      },
    ]);
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarPaciente(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Dueno:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarPropietario(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Telefono Contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarTelefono(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_Es"
            headerTextIOS="Elige la fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{fecha}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_Es"
            headerTextIOS="Elige una hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
            is24Hour
          />
          <Text>{hora}</Text>
        </View>
        <View>
          <Text style={styles.label}>Sintomas:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarSintomas(texto)}
            multiline
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => crearNuevaCita()}
            style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}>submit</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
    marginBottom: 30,
  },
  textoSubmit: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
