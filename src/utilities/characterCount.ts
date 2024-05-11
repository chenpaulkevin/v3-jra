'use client';

import { FieldDescriptionProps } from 'payload/types';
import { FieldDescription } from '@payloadcms/ui/forms/FieldDescription';
import { useFieldProps } from '@payloadcms/ui/forms/FieldPropsProvider';
import { useFormFields } from '@payloadcms/ui/forms/Form';

export default function characterCount(props: FieldDescriptionProps) {
  const { path } = useFieldProps();
  const { value } = useFormFields(([fields]) => fields[path]);

  const description = `${typeof value === 'string' ? 20 - value.length : '20'} characters left (field: ${path[0]})`;

  return description;
}