<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facture BillApp</title>
</head>
<body style="margin:0;padding:0;background:#050505;color:#f5f5f5;font-family:Arial,sans-serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050505;padding:28px 16px;">
    <tr>
        <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#141414;border:1px solid #262626;border-radius:14px;overflow:hidden;">
                <tr>
                    <td style="padding:24px 28px;border-bottom:1px solid #262626;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <svg width="34" height="34" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BillApp logo">
                                <rect x="6" y="6" width="52" height="52" rx="16" fill="#D40B16" />
                                <rect x="18" y="14" width="28" height="36" rx="8" fill="#F8FAFC" />
                                <path d="M24 23H40" stroke="#B00510" stroke-width="3" stroke-linecap="round" />
                                <path d="M24 29H40" stroke="#B00510" stroke-width="3" stroke-linecap="round" />
                                <path d="M24 35H31" stroke="#B00510" stroke-width="3" stroke-linecap="round" />
                                <path d="M33 42L41 37L33 32V42Z" fill="#B00510" />
                            </svg>
                            <span style="font-size:24px;font-weight:700;letter-spacing:0.04em;color:#ffffff;">
                                Bill<span style="color:#E50914;">App</span> Streaming
                            </span>
                        </div>
                        <p style="margin:12px 0 0 0;color:#d4d4d4;line-height:1.5;">
                            Bonjour {{ $userName }}, votre facture vient d'etre generee.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding:24px 28px;">
                        <p style="margin:0 0 10px 0;color:#a3a3a3;font-size:13px;text-transform:uppercase;letter-spacing:0.06em;">Montant</p>
                        <p style="margin:0 0 20px 0;font-size:30px;font-weight:700;color:#ffffff;">
                            {{ number_format($amount, 0, ',', ' ') }} FCFA
                        </p>

                        <p style="margin:0 0 8px 0;color:#a3a3a3;font-size:13px;text-transform:uppercase;letter-spacing:0.06em;">Reference</p>
                        <p style="margin:0 0 20px 0;font-size:18px;font-weight:600;">{{ $reference }}</p>

                        <p style="margin:0 0 8px 0;color:#a3a3a3;font-size:13px;text-transform:uppercase;letter-spacing:0.06em;">Date de facturation</p>
                        <p style="margin:0;font-size:16px;font-weight:500;">
                            {{ $billedAt->timezone(config('app.timezone'))->format('d/m/Y H:i') }}
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding:20px 28px;background:#0a0a0a;border-top:1px solid #262626;">
                        <p style="margin:0;color:#8a8a8a;font-size:12px;">
                            Cet email a ete envoye automatiquement par BillApp.
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
