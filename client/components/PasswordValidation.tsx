// components/PasswordValidation.tsx
'use client';

interface PasswordValidationProps {
  password: string;
}

export function PasswordValidation({ password }: PasswordValidationProps) {
  const requirements = [
    { label: '8+ characters', regex: /^.{8,}$/ },
    { label: 'Uppercase letter', regex: /[A-Z]/ },
    { label: 'Lowercase letter', regex: /[a-z]/ },
    { label: 'Number', regex: /\d/ },
    { label: 'Special character', regex: /[!@#$%^&*(),.?":{}|<>]/ }
  ];

  return (
    <div className="text-xs text-muted-foreground mt-1">
      <ul className="list-disc pl-5">
        {requirements.map((req) => (
          <li 
            key={req.label}
            className={req.regex.test(password) ? 'text-green-500' : 'text-red-500'}
          >
            {req.label}
          </li>
        ))}
      </ul>
    </div>
  );
}