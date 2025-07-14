import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFormData } from './forms/FormContext';
import EditableField from './components/EditableField';
import { borderRadius, colors, spacing, typography } from './theme';

export default function PeoplePage() {
  const router = useRouter();
  const { formData, loadPeople, updatePerson } = useFormData();
  const [editingPersonId, setEditingPersonId] = useState<string | null>(null);

  // Load people when component mounts
  useEffect(() => {
    loadPeople();
  }, []);

  const handleRefresh = async () => {
    try {
      await loadPeople();
    } catch (error) {
      console.error('Error refreshing people:', error);
    }
  };

  const handleAddPerson = () => {
    router.push('/forms/person/name');
  };

  const handleBack = () => {
    router.back();
  };

  const handleFieldUpdate = async (
    personId: string,
    field: string,
    value: string,
  ) => {
    try {
      await updatePerson(personId, { [field]: value });
    } catch (error) {
      console.error('Error updating person:', error);
    }
  };

  const handleEditToggle = (personId: string) => {
    setEditingPersonId(editingPersonId === personId ? null : personId);
  };

  const formatDate = (date: any) => {
    if (!date) return 'Unknown';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString();
  };

  const PersonCard = ({ person }: { person: any }) => {
    const isEditing = editingPersonId === person.id;

    return (
      <View style={styles.personCard}>
        {isEditing ? (
          // Editable View
          <View>
            <View style={styles.editHeader}>
              <Text style={styles.editTitle}>Editing {person.name}</Text>
              <TouchableOpacity
                style={styles.cancelEditButton}
                onPress={() => handleEditToggle(person.id)}
              >
                <Text style={styles.cancelEditButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.editableFields}>
              <EditableField
                label="Name"
                value={person.name}
                onSave={(value) => handleFieldUpdate(person.id!, 'name', value)}
                placeholder="Enter name"
                autoCapitalize="words"
              />

              <EditableField
                label="Age"
                value={String(person.age)}
                onSave={(value) => handleFieldUpdate(person.id!, 'age', value)}
                placeholder="Enter age"
                keyboardType="number-pad"
                autoCapitalize="none"
              />

              <EditableField
                label="Occupation"
                value={person.industry}
                onSave={(value) =>
                  handleFieldUpdate(person.id!, 'industry', value)
                }
                placeholder="Enter occupation"
                autoCapitalize="words"
              />

              <EditableField
                label="How did you meet?"
                value={person.how_we_met}
                onSave={(value) =>
                  handleFieldUpdate(person.id!, 'how_we_met', value)
                }
                placeholder="Enter how you met"
                autoCapitalize="words"
              />
            </View>
          </View>
        ) : (
          // Static View
          <View>
            <View style={styles.personHeader}>
              <Text style={styles.personName}>{person.name}</Text>
              <View style={styles.ageBadge}>
                <Text style={styles.ageText}>{person.age} years old</Text>
              </View>
            </View>

            <View style={styles.personDetails}>
              <Text style={styles.personDetail}>💼 {person.industry}</Text>
              {person.how_we_met && (
                <Text style={styles.personDetail}>🤝 {person.how_we_met}</Text>
              )}
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.personDate}>
                Added on {formatDate(person.createdAt)}
              </Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditToggle(person.id)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={formData.loading}
          onRefresh={handleRefresh}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>People</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPerson}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {formData.loading ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Loading people...</Text>
          </View>
        ) : formData.people.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No one here yet!</Text>
            <Text style={styles.emptyStateText}>
              Add your first person to get started.
            </Text>
            <TouchableOpacity
              onPress={handleAddPerson}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Add a Person</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.peopleList}>
            {formData.people.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.sm,
  },
  backButtonText: {
    ...typography.bodyBold,
    color: colors.accent,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  addButton: {
    padding: spacing.sm,
  },
  addButtonText: {
    ...typography.bodyBold,
    color: colors.secondary,
    fontSize: 18,
  },
  content: {
    padding: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    marginTop: spacing.xxl,
  },
  emptyStateTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  emptyStateText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24,
    maxWidth: 300,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: colors.white,
    ...typography.bodyBold,
    letterSpacing: 0.5,
  },
  peopleList: {
    gap: spacing.lg,
  },
  personCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  editHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  editTitle: {
    ...typography.h3,
    color: colors.text,
  },
  cancelEditButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.sm,
  },
  cancelEditButtonText: {
    color: colors.white,
    ...typography.caption,
    fontWeight: '600',
  },
  personHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  personName: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
  },
  ageBadge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    marginLeft: spacing.md,
    backgroundColor: colors.primary,
  },
  ageText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
  personDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  personDetail: {
    ...typography.body,
    color: colors.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  personDate: {
    ...typography.caption,
    color: colors.textMuted,
  },
  editButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
  },
  editButtonText: {
    color: colors.white,
    ...typography.caption,
    fontWeight: '600',
  },
  editableFields: {
    marginTop: spacing.md,
  },
});
