# buduje wizualizacja/asystent-dane.js z plików od szkoły (faq.json, baza_danych.json): python3 dane/asystent/zbuduj.py
import json, sys
import os
U = os.path.dirname(os.path.abspath(__file__)) + '/'
faq = json.load(open(U + 'faq.json'))
baza = json.load(open(U + 'baza_danych.json'))
# biura w kolejności z zapis.html (OFFICES), żeby ?biuro=N trafiało w dobre biuro
order = ['wroclawska', 'czarnowiejska', 'kalwaryjska', 'jerzmanowskiego', 'wieliczka', 'zabierzow']
names = {'wroclawska': 'Kraków – Wrocławska', 'czarnowiejska': 'Kraków – Czarnowiejska', 'kalwaryjska': 'Kraków – Kalwaryjska',
         'jerzmanowskiego': 'Kraków – Jerzmanowskiego', 'wieliczka': 'Wieliczka', 'zabierzow': 'Zabierzów'}
keys = {'wroclawska': ['wroclawsk'], 'czarnowiejska': ['czarnowiejsk'], 'kalwaryjska': ['kalwaryjsk', 'podgorz'],
        'jerzmanowskiego': ['jerzmanowsk', 'prokocim'], 'wieliczka': ['wielicz'], 'zabierzow': ['zabierzow']}
od = {o['id']: o for o in baza['oddzialy']}
biura = []
for k in order:
    o = od[k]
    tel2 = o.get('telefon_dodatkowy', '').split(' (')[0]
    biura.append({'id': k, 'nazwa': names[k], 'adres': o['adres'], 'tel': o['telefon'], 'tel2': tel2, 'email': o['email'], 'k': keys[k]})
cennik = [[c['kategoria'], c['kurs'], c['cena_pln'], c['cena_regularna_pln'], c['teoria_h'], c['praktyka_h']] for c in baza['cennik']]
def iso(d): dd, mm, yy = d.split('.'); return f'{yy}-{mm}-{dd}'
terminy = [[t['kurs'], t['oddzial'], iso(t['data']), t['godzina']] for t in baza['terminy']]
items = [[x['id'][4:], x['dzial'], x['pytanie'], x['odpowiedz'], 1 if x['status'] == 'potwierdzone' else 0] for x in faq['faq']]
dane = {'stan': faq['stan_na'], 'faq': items, 'biura': biura, 'cennik': cennik, 'terminy': terminy,
        'godziny': 'pn–pt 10:00–18:00, sob 9:00–13:00'}
out = ('// Dane asystenta OES (stan na ' + faq['stan_na'] + '): FAQ, biura, cennik i terminy od szkoły.\n'
       '// Plik jest generowany z faq.json i baza_danych.json; faq: [id, dział, pytanie, odpowiedź, 1 = potwierdzone / 0 = do potwierdzenia]\n'
       'window.OES_DANE = ' + json.dumps(dane, ensure_ascii=False, separators=(',', ':')) + ';\n')
open(sys.argv[1] if len(sys.argv) > 1 else U + '../../wizualizacja/asystent-dane.js', 'w').write(out)
print(len(out.encode()), 'bytes', len(items), 'faq')
