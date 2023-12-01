from suit.apps import DjangoSuitConfig
from suit.menu import ParentItem, ChildItem


class SuitConfig(DjangoSuitConfig):
    layout = 'horizontal'

    menu = (
        ParentItem('Users', children=[
            ChildItem(model='auth.user'),
            ChildItem('User groups', 'auth.group'),
        ], icon='fa fa-users'),
        ParentItem('Settings', children=[
            ChildItem('Open Documentation', url='/apis/documentation/', target_blank=True),
            ChildItem('Password change', url='admin:password_change'),
        ], align_right=True, icon='fa fa-cog'),
    )
