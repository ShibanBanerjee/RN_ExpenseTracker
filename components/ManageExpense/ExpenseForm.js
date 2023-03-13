import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Input from './Input';
import { GlobalStyles } from '../../constants/styles';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {

    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date): '',
            isValid: true,
        },
        title: {
            value: defaultValues ? defaultValues.title : '',
            isValid: true,
        }
    });


    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    }

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            title: inputs.title.value,
        };

        

        const amountIsValid = !isNaN(expenseData.amount) && (expenseData.amount > 0);
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const titleIsValid = expenseData.title.trim().length > 0;

        

        if(!amountIsValid || !dateIsValid || !titleIsValid) {
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid},
                    date: { value: curInputs.date.value, isValid: dateIsValid},
                    title: { value: curInputs.title.value, isValid: titleIsValid},
                }
            })
            return;
        }

        onSubmit(expenseData);
    }

    const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.title.isValid;

  return (
    <View style={styles.formStyle}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input style={styles.rowInput} label="Amount" 
        invalid={!inputs.amount.isValid}
        textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
        }} />
        <Input style={styles.rowInput} label="Date" 
        invalid={!inputs.date.isValid}
        textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
        }} />
      </View>
      <Input label="Title" 
      invalid={!inputs.title.isValid}
      textInputConfig={{
            multiline: true,
            onChangeText: inputChangedHandler.bind(this, 'title'),
            value: inputs.title.value,
        }} />
      {formIsValid && (
        <Text style={styles.errorText}>Invalid Input - Please check your values</Text>
        )}
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.buttons}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.buttons}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  )
};

export default ExpenseForm;

const styles = StyleSheet.create({
    formStyle: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
      minWidth: 120,
      marginHorizontal: 8
    },
    errorText: {
      textAlign: 'center',
      color: GlobalStyles.colors.error500,
      margin: 8,
      fontWeight: 'bold'
    }
})