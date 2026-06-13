import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { supabase } from '../lib/supabase';

type RestaurantProfile = {
  id: string;
  restaurant_name: string;
  legal_name: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
  email: string | null;
  tax_number: string | null;
  haccp_responsible_person: string | null;
};

type RestaurantProfileForm = {
  restaurant_name: string;
  legal_name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  tax_number: string;
  haccp_responsible_person: string;
};

const emptyForm: RestaurantProfileForm = {
  restaurant_name: '',
  legal_name: '',
  address: '',
  city: '',
  country: '',
  phone: '',
  email: '',
  tax_number: '',
  haccp_responsible_person: '',
};

const fields: {
  key: keyof RestaurantProfileForm;
  label: string;
  required?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
}[] = [
  { key: 'restaurant_name', label: 'Restaurant Name', required: true },
  { key: 'legal_name', label: 'Legal Name' },
  { key: 'address', label: 'Address' },
  { key: 'city', label: 'City' },
  { key: 'country', label: 'Country' },
  { key: 'phone', label: 'Phone', keyboardType: 'phone-pad' },
  { key: 'email', label: 'Email', keyboardType: 'email-address' },
  { key: 'tax_number', label: 'Tax Number' },
  { key: 'haccp_responsible_person', label: 'HACCP Responsible Person' },
];

const profileSelectColumns =
  'id, restaurant_name, legal_name, address, city, country, phone, email, tax_number, haccp_responsible_person';

function profileToForm(profile: RestaurantProfile): RestaurantProfileForm {
  return {
    restaurant_name: profile.restaurant_name,
    legal_name: profile.legal_name ?? '',
    address: profile.address ?? '',
    city: profile.city ?? '',
    country: profile.country ?? '',
    phone: profile.phone ?? '',
    email: profile.email ?? '',
    tax_number: profile.tax_number ?? '',
    haccp_responsible_person: profile.haccp_responsible_person ?? '',
  };
}

function formToPayload(form: RestaurantProfileForm) {
  return {
    restaurant_name: form.restaurant_name.trim(),
    legal_name: form.legal_name.trim() || null,
    address: form.address.trim() || null,
    city: form.city.trim() || null,
    country: form.country.trim() || null,
    phone: form.phone.trim() || null,
    email: form.email.trim() || null,
    tax_number: form.tax_number.trim() || null,
    haccp_responsible_person:
      form.haccp_responsible_person.trim() || null,
  };
}

export default function RestaurantProfileScreen() {
  const [profileId, setProfileId] = useState<string | null>(null);
  const [form, setForm] = useState<RestaurantProfileForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setIsLoading(true);
      setErrorMessage(null);

      if (!supabase) {
        if (isMounted) {
          setErrorMessage('Supabase client is not initialized.');
          setIsLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from('restaurant_profiles')
        .select(profileSelectColumns)
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle<RestaurantProfile>();

      if (!isMounted) {
        return;
      }

      if (error) {
        setErrorMessage(error.message);
      } else if (data) {
        setProfileId(data.id);
        setForm(profileToForm(data));
      } else {
        setProfileId(null);
        setForm(emptyForm);
      }

      setIsLoading(false);
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  function updateField(key: keyof RestaurantProfileForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  }

  async function handleSave() {
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!form.restaurant_name.trim()) {
      setErrorMessage('Restaurant name is required.');
      return;
    }

    if (!supabase) {
      setErrorMessage('Supabase client is not initialized.');
      return;
    }

    setIsSaving(true);

    const payload = formToPayload(form);
    const profileLookup = profileId
      ? { id: profileId, error: null }
      : await fetchFirstProfileId();

    if (profileLookup.error) {
      setErrorMessage(profileLookup.error);
      setIsSaving(false);
      return;
    }

    const { data, error } = profileLookup.id
      ? await supabase
          .from('restaurant_profiles')
          .update(payload)
          .eq('id', profileLookup.id)
          .select('id')
          .single()
      : await supabase
          .from('restaurant_profiles')
          .insert(payload)
          .select('id')
          .single();

    if (error) {
      setErrorMessage(error.message);
    } else {
      setProfileId(data.id);
      setSuccessMessage('Restaurant profile saved.');
    }

    setIsSaving(false);
  }

  async function fetchFirstProfileId() {
    if (!supabase) {
      return {
        id: null,
        error: 'Supabase client is not initialized.',
      };
    }

    const { data, error } = await supabase
      .from('restaurant_profiles')
      .select('id')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle<{ id: string }>();

    if (error) {
      return {
        id: null,
        error: error.message,
      };
    }

    return {
      id: data?.id ?? null,
      error: null,
    };
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#1f5f35" />
        <Text style={styles.loadingText}>Loading restaurant profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.sectionLabel}>Restaurant Information</Text>
        <Text style={styles.title}>Restaurant Profile</Text>
        <Text style={styles.subtitle}>
          Manage the basic restaurant details used across HACCP setup.
        </Text>
      </View>

      <View style={styles.form}>
        {fields.map((field) => (
          <View key={field.key} style={styles.fieldGroup}>
            <Text style={styles.label}>
              {field.label}
              {field.required ? ' *' : ''}
            </Text>
            <TextInput
              style={styles.input}
              value={form[field.key]}
              autoCapitalize={
                field.keyboardType === 'email-address' ? 'none' : 'sentences'
              }
              autoCorrect={field.keyboardType !== 'email-address'}
              keyboardType={field.keyboardType ?? 'default'}
              onChangeText={(value) => updateField(field.key, value)}
              placeholder={field.label}
              placeholderTextColor="#9aa394"
            />
          </View>
        ))}
      </View>

      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <Pressable
        style={[styles.button, isSaving ? styles.buttonDisabled : null]}
        accessibilityRole="button"
        disabled={isSaving}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          {isSaving ? 'Saving...' : 'Save'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f7f8f5',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#5d675b',
    fontSize: 16,
  },
  container: {
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 40,
    backgroundColor: '#f7f8f5',
    gap: 24,
  },
  header: {
    gap: 8,
  },
  sectionLabel: {
    color: '#1f5f35',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  title: {
    color: '#162115',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#5d675b',
    fontSize: 16,
    lineHeight: 23,
  },
  form: {
    gap: 18,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    color: '#2f3a2c',
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    minHeight: 54,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#dce2d7',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    color: '#162115',
    fontSize: 16,
  },
  button: {
    minHeight: 54,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: '#1f5f35',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  successText: {
    color: '#1f5f35',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    color: '#9f1d1d',
    fontSize: 15,
    lineHeight: 21,
  },
});
