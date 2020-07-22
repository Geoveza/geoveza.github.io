class ge0v3z4.go.id
        self.variables = {
            'name': 'Geoveza',
            'age': 17,
            'hobby': 'IT Security',
            'languages': ('Bahasa', 'English')
        }

    def description(self):
        print('------ge0v3z4.go.id------')
        for index, value in enumerate(self.variables.values()):
            if index == 0:
                print(f'Name: {value}')
            elif index == 1:
                print(f'Age: {value}')
            elif index == 2:
                print(f'Hobby: {value}')
            elif index == 3:
                print(f'Languages: {value}')

    def social_medias(self):
        platforms = {
            'Instagram': 'geoveza.go.id',
            'Discord Username': 'K I M O C H I',
            'Telegram': 'geoveza_id'
        }

        print('\n-----contact-----')
        for key, value in platforms.items():
            print(f'{key}: {value}')


if __name__ == '__main__':
    zoony = Zoony1337()
    zoony.description()
    zoony.social_medias()
